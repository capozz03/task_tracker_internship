import React from 'react';
import { Modal, ModalProps, Spin } from 'antd';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Attachments from 'features/Tasks/currentTaskComponents/Attachments';
import {
  TaskFormSlice,
  TaskInWorkSlice,
  TaskInboxSlice,
  TaskCompletedSlice,
  TaskFilters,
} from 'store/slice';
import Title from '../Title';
import MenuHeader from 'features/Tasks/currentTaskComponents/MenuHeader';
import CheckListArea from 'features/Tasks/currentTaskComponents/CheckListArea';
import Description from 'features/Tasks/tasksComponents/Description';

const TaskModal = (props: ModalProps) => {
  const dispatch = useDispatch();
  const task = useSelector(TaskFormSlice.getTask);
  const status = useSelector(TaskFormSlice.getTaskFormStatusTask);
  const isLoading = useSelector(TaskFormSlice.isLoadingStatus);
  const paginationInbox = useSelector(TaskInboxSlice.getPagination);
  const paginationInWork = useSelector(TaskInWorkSlice.getPagination);
  const paginationInCompleted = useSelector(TaskCompletedSlice.getPagination);
  const filters = useSelector(TaskFilters.getFilters);

  const cancelHandle = () => {
    if (status?.name === 'Создана') {
      dispatch(
        TaskInboxSlice.getTasksAsync({
          per_page: paginationInbox!.per_page,
          page: paginationInbox!.page_current,
          ...filters,
        }),
      );
    }
    if (status?.name === 'В работе') {
      dispatch(
        TaskInWorkSlice.getTasksAsync({
          per_page: paginationInWork!.per_page,
          page: paginationInWork!.page_current,
          ...filters,
        }),
      );
    }
    if (status?.name === 'Выполнена' || status?.name === 'Не выполнена') {
      dispatch(
        TaskCompletedSlice.getTasksAsync({
          per_page: paginationInCompleted!.per_page,
          page: paginationInCompleted!.page_current,
          ...filters,
        }),
      );
    }
    dispatch(TaskFormSlice.hiddenTaskForm());
  };
  return (
    <Modal {...props} onCancel={cancelHandle} width="75%" footer={null}>
      <Spin spinning={isLoading}>
        <div className={styles.wrap}>
          <div className={styles.title}>
            <div className={styles.name}>
              {task && <Title title={task.title} taskId={task.task_id} />}
            </div>
            <div className={styles.menu}>
              <MenuHeader />
            </div>
          </div>
          <div className={styles.leftColumn}>
            {task && <Description description={task.description} taskId={task.task_id} />}
            <div className={styles.checklist}>
              <CheckListArea />
            </div>
            {task && <Attachments taskId={task.task_id} />}
            <div>actions</div>
          </div>
          <div className={styles.rightColumn}>
            <div>details</div>
            <div>contributors</div>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default TaskModal;
