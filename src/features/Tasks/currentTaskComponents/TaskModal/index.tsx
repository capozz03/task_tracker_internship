import React from 'react';
import { Modal, ModalProps, Spin } from 'antd';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { RequestStatuses } from 'shared';
import Title from 'features/Tasks/tasksComponents/Title';

const TaskModal = (props: ModalProps) => {
  const dispatch = useDispatch();
  const task = useSelector(TaskFormSlice.getTask);
  const status = useSelector(TaskFormSlice.getTaskFormStatus);
  const cancelHandle = () => {
    dispatch(TaskFormSlice.hiddenTaskForm());
  };
  return (
    <Modal {...props} onCancel={cancelHandle} width="75%" footer={null}>
      {status === RequestStatuses.LOADING ? (
        <Spin />
      ) : (
        <div className={styles.wrap}>
          <div className={styles.title}>
            <div className={styles.name}>
              {task && <Title title={task.title} taskId={task.task_id} />}
            </div>
            <div className={styles.menu}>menu</div>
          </div>
          <div className={styles.leftColumn}>
            <div>description</div>
            <div>checklists</div>
            <div>attachments</div>
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
