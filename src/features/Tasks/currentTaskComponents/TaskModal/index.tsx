import React from 'react';
import { Collapse, Modal, ModalProps, Spin } from 'antd';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import Title from 'features/Tasks/tasksComponents/Title';
import Description from 'features/Tasks/tasksComponents/Description';

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
            <div className={styles.menu}>menu</div>
          </div>
          <div className={styles.leftColumn}>
            {task && <Description description={task.description} taskId={task.task_id} />}
            <div>checklists</div>
            <div>attachments</div>
            <div>actions</div>
          </div>
          <div className={styles.rightColumn}>
            <Collapse className={styles.collapse} activeKey={[1, 2]} bordered={false}>
              <Collapse.Panel className={styles.collapseItem} key="1" header="Детали">
                <div>details</div>
              </Collapse.Panel>
              <Collapse.Panel className={styles.collapseItem} key="2" header="Участники">
                <div>contributors</div>
              </Collapse.Panel>
            </Collapse>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default TaskModal;
