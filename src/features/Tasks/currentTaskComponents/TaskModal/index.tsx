import React from 'react';
import { Collapse, Modal, ModalProps, Spin } from 'antd';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Attachments from 'features/Tasks/currentTaskComponents/Attachments';
import {
  TaskFormSlice,
  TaskInWorkSlice,
  TaskInboxSlice,
  TaskCompletedSlice,
  TaskFilters,
  TaskFailedSlice,
} from 'store/slice';
import Title from '../Title';
import MenuHeader from 'features/Tasks/currentTaskComponents/MenuHeader';
import CheckListArea from 'features/Tasks/currentTaskComponents/CheckListArea';
import Description from 'features/Tasks/currentTaskComponents/Description';
import MembersPanel from './MembersPanel';
import Details from 'features/Task/taskModalComponents/Details';
import { CollapseHeader, CollapseMembersHeader } from './MembersPanel/MemberPanelHeaders';
import TaskHistory from 'features/Task/taskModalComponents/History';

const TaskModal = (props: ModalProps) => {
  const dispatch = useDispatch();
  const task = useSelector(TaskFormSlice.getTask);
  const roles = useSelector(TaskFormSlice.getRoles);
  const status = useSelector(TaskFormSlice.getTaskFormStatusTask);
  const isLoading = useSelector(TaskFormSlice.isLoadingStatus);
  const paginationInbox = useSelector(TaskInboxSlice.getPagination);
  const paginationInWork = useSelector(TaskInWorkSlice.getPagination);
  const paginationInCompleted = useSelector(TaskCompletedSlice.getPagination);
  const paginationInFailed = useSelector(TaskFailedSlice.getPagination);
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
    if (status?.name === 'Выполнена') {
      dispatch(
        TaskCompletedSlice.getTasksAsync({
          per_page: paginationInCompleted!.per_page,
          page: paginationInCompleted!.page_current,
          ...filters,
        }),
      );
    }
    if (status?.name === 'Не выполнена') {
      dispatch(
        TaskFailedSlice.getTasksAsync({
          per_page: paginationInFailed!.per_page,
          page: paginationInFailed!.page_current,
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
            <div className={styles.description}>
              {task && <Description description={task.description} taskId={task.task_id} />}
            </div>
            <div className={styles.checklist}>
              <CheckListArea />
            </div>
            <div className={styles.attachments}>
              {task && <Attachments taskId={task.task_id} />}
            </div>
            <TaskHistory />
          </div>
          <div className={styles.rightColumn}>
            <Collapse
              className={styles.collapse}
              defaultActiveKey={['details', 'members']}
              bordered={false}
            >
              <Collapse.Panel
                className={styles.collapseItem}
                key="details"
                header={CollapseHeader({ name: 'Детали', children: '' })}
                showArrow={false}
              >
                <Details />
              </Collapse.Panel>
              <Collapse.Panel
                className={styles.collapseItem}
                key="members"
                header={CollapseMembersHeader({ roles })}
                showArrow={false}
              >
                <MembersPanel />
              </Collapse.Panel>
            </Collapse>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default TaskModal;
