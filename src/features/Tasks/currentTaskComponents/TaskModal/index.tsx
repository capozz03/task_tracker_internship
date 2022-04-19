import React from 'react';
import { Modal, ModalProps, Spin } from 'antd';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { Title } from 'features/Tasks/currentTaskComponents';
import MenuHeader from 'features/Tasks/currentTaskComponents/MenuHeader';
import CheckListArea from 'features/Tasks/currentTaskComponents/CheckListArea';

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
            <div className={styles.menu}><MenuHeader /></div>
          </div>
          <div className={styles.leftColumn}>
            <div>description</div>
            <div className={styles.checklist}><CheckListArea /></div>
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
