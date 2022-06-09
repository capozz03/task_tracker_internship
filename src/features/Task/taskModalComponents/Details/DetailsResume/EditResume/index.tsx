import { Modal, Button, Select, Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFormResult } from 'store/slice/task/taskForm';
import style from './index.module.scss';

const { Option } = Select;
const { TextArea } = Input;

type EditResumeProps = {
  taskId: string;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditResume = ({ taskId, isModalVisible, setIsModalVisible }: EditResumeProps) => {
  const dispatch = useDispatch();
  const [formResultResume, setFormResultResume] = useState('Требуется резюме');
  const [formResultComment, setFormResultComment] = useState('');
  const [isDisabledTextarea, setIsDisabledTextarea] = useState(true);

  const handleCancel = () => {
    setIsModalVisible(false);
    setFormResultComment('');
  };

  const selectChange = (value: string) => {
    setFormResultResume(value);
    if (value === 'Требуется резюме') {
      setIsDisabledTextarea(true);
    } else {
      setIsDisabledTextarea(false);
    }
  };

  const textAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormResultComment(e.target.value);
  };

  const saveFormResult = () => {
    dispatch(
      setFormResult({
        form_result: {
          taskId,
          formResult: [
            { field_name: 'resume', value: formResultResume },
            { field_name: 'comment', value: formResultComment },
          ],
        },
      }),
    );
    handleCancel();
  };
  return (
    <Modal
      className={style.modalResume}
      title=""
      width={300}
      centered
      visible={isModalVisible}
      footer={null}
      onCancel={handleCancel}
    >
      <div className={style.innerModal}>
        <h3 className={style.innerModal_title}>Оценка работы</h3>
        <p className={style.innerModal_subtitle}>Резюме:</p>
        <Select className={style.select} defaultValue="Требуется резюме" onChange={selectChange}>
          <Option value="Требуется резюме">Требуется резюме</Option>
          <Option value="Задача принята">Задача принята</Option>
          <Option value="Переделать срочно">Переделать срочно</Option>
          <Option value="Задача отклонена">Задача отклонена</Option>
        </Select>
        <p className={style.innerModal_subtitle}>Комментарий:</p>
        <TextArea
          className={style.textArea}
          rows={4}
          maxLength={100}
          onChange={textAreaChange}
          value={formResultComment}
          disabled={isDisabledTextarea}
        />
        <Button className={style.saveBtn} type="primary" onClick={saveFormResult}>
          Сохранить
        </Button>
      </div>
    </Modal>
  );
};

export default EditResume;
