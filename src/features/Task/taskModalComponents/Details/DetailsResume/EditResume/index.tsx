import { Modal, Button, Select, Input, Form, FormInstance } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setFormResult } from 'store/slice/task/taskForm';
import { TResumeForm } from '..';
import style from './index.module.scss';

const { Option } = Select;
const { TextArea } = Input;
const { Item } = Form;

type EditResumeProps = {
  taskId: string;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  resumeValue: string | undefined;
  commentValue: string | undefined;
  form: FormInstance<TResumeForm>;
};

const EditResume = ({
  taskId,
  isModalVisible,
  setIsModalVisible,
  resumeValue,
  commentValue,
  form,
}: EditResumeProps) => {
  const dispatch = useDispatch();

  const onFinish = ({ resume, comment }: TResumeForm) => {
    dispatch(
      setFormResult({
        form_result: {
          taskId,
          formResult: [
            { field_name: 'resume', value: resume },
            { field_name: 'comment', value: comment },
          ],
        },
      }),
    );
    setIsModalVisible(false);
    form.setFieldsValue({ resume, comment });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.setFieldsValue({ resume: resumeValue, comment: commentValue });
  };

  const handleResumeChange = (changedValue: any) => {
    if (changedValue === 'Требуется резюме') {
      form.setFieldsValue({ resume: changedValue, comment: '' });
    } else {
      form.setFieldsValue({ resume: changedValue });
    }
  };

  const normalizeResume = (_: string, prevValue: string) => {
    if (prevValue === 'Требуется резюме') {
      form.setFieldsValue({ comment: commentValue });
    }
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
      <Form
        className={style.innerModal}
        name="resumeForm"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <h3 className={style.innerModal_title}>Оценка работы</h3>
        <Item
          className={style.innerModal_subtitle}
          label="Резюме:"
          name="resume"
          initialValue={resumeValue}
          normalize={normalizeResume}
        >
          <Select
            className={style.select}
            value={resumeValue}
            onChange={handleResumeChange}
          >
            <Option value="Требуется резюме">Требуется резюме</Option>
            <Option value="Задача принята">Задача принята</Option>
            <Option value="Переделать срочно">Переделать срочно</Option>
            <Option value="Задача отклонена">Задача отклонена</Option>
          </Select>
        </Item>
        <Item noStyle shouldUpdate>
          {({ getFieldValue }: FormInstance<TResumeForm>) => {
            const isDisabled = getFieldValue('resume') === 'Требуется резюме';
            return (
              <Item
                className={style.innerModal_subtitle}
                label="Комментарий:"
                name="comment"
                initialValue={commentValue}
              >
                <TextArea
                  className={style.textArea}
                  rows={4}
                  maxLength={100}
                  value={commentValue}
                  disabled={isDisabled}
                />
              </Item>
            );
          }}
        </Item>

        <Item>
          <Button className={style.saveBtn} type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Item>
      </Form>
    </Modal>
  );
};

export default EditResume;
