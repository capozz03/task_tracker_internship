import { EditFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import EditResume from './EditResume';
import style from './index.module.scss';

type TDetailsResumeProps = {
  taskId: string;
  formResultRequired?: boolean;
  canChange?: boolean;
};

export type TResumeForm = {
  resume: string;
  comment: string;
};

const DetailsResume = ({ taskId, formResultRequired, canChange = false }: TDetailsResumeProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [colorOfLabel, setColorOfLabel] = useState('#696974');
  const [form] = useForm<TResumeForm>();

  const formResult = useSelector(TaskFormSlice.getTaskFormResultForm);
  const resume = useSelector(TaskFormSlice.getFormResultResume);
  const comment = useSelector(TaskFormSlice.getFormResultComment);

  const resumeValue = formResult && formResult.length ? resume?.value : 'Требуется резюме';
  const commentValue = formResult && formResult.length && comment?.value ? comment?.value : 'нет комментария';

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    switch (resume?.value) {
      case 'Переделать срочно':
        setColorOfLabel('#FF0B37');
        break;
      case 'Задача отклонена':
        setColorOfLabel('#FF0B37');
        break;
      case 'Задача принята':
        setColorOfLabel('#82C43C');
        break;
      default:
        setColorOfLabel('#696974');
    }
    form.setFieldsValue({ resume: resume?.value, comment: comment?.value });
  }, [resume?.value]);

  return (
    <div>
      <div className={style.category}>
        <div className={style.titleDetails}>
          <p className={style.title}>Резюме</p>
          {canChange && formResultRequired && (
            <Button
              className={style.dropdownButton}
              icon={<EditFilled className={style.icon} />}
              onClick={showModal}
            />
          )}
        </div>
        <div className={style.labels} style={{ color: colorOfLabel }}>
          {resumeValue}
        </div>
      </div>
      <div className={style.category}>
        <div className={style.titleDetails}>
          <p className={style.title}>Комментарий</p>
        </div>
        <div className={style.labels}>{commentValue}</div>
      </div>
      <EditResume
        taskId={taskId}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        resumeValue={resumeValue}
        commentValue={comment?.value}
        form={form}
      />
    </div>
  );
};

export default DetailsResume;
