import React from 'react';
import { Modal, ModalProps, Spin } from 'antd';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import Title from 'features/Tasks/tasksComponents/Title';
import Attachments from 'features/Tasks/tasksComponents/Attachments';
import Description from 'features/Tasks/tasksComponents/Description';
import MenuButton from './MenuButton';

const TaskModal = (props: ModalProps) => {
  const dispatch = useDispatch();
  const task = useSelector(TaskFormSlice.getTask);
  const isLoading = useSelector(TaskFormSlice.isLoadingStatus);
  const cancelHandle = () => {
    dispatch(TaskFormSlice.hiddenTaskForm());
  };
  return (
    <Modal {...props} onCancel={cancelHandle} width="75%" footer={null}>
      {isLoading ? (
        <Spin />
      ) : (
        <div className={styles.wrap}>
          <div className={styles.title}>
            <div className={styles.name}>
              {task && <Title title={task.title} taskId={task.task_id} />}
            </div>
            <div className={styles.menu}>
              <MenuButton />
            </div>
          </div>
          <div className={styles.leftColumn}>
            {task && <Description description={task.description} taskId={task.task_id} />}
            <div>checklists</div>
            {task && <Attachments title={task.title} taskStatusId={task.status.task_status_id} />}
            <div>actions</div>
          </div>
          <div className={styles.rightColumn}>
            <div>details</div>
            <div>contributors</div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default TaskModal;
