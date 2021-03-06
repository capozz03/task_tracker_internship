import React, { useEffect } from 'react';
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
import { alert } from 'shared/ui';
import { checkPermission, isLoadingStatusCheck } from 'shared/helpers';
import { useNavigate } from 'react-router-dom';

const TaskModal = (props: ModalProps) => {
  const { visible } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector(TaskFormSlice.getTask);
  const roles = useSelector(TaskFormSlice.getRoles);
  const rolesArray = useSelector(TaskFormSlice.getTaskFormRoles);
  const status = useSelector(TaskFormSlice.getTaskFormStatusTask);
  const isLoading = useSelector(TaskFormSlice.isLoadingStatus);
  const paginationInbox = useSelector(TaskInboxSlice.getPagination);
  const paginationInWork = useSelector(TaskInWorkSlice.getPagination);
  const paginationInCompleted = useSelector(TaskCompletedSlice.getPagination);
  const paginationInFailed = useSelector(TaskFailedSlice.getPagination);
  const filters = useSelector(TaskFilters.getFilters);

  const formAvailable = useSelector(TaskFormSlice.getTaskFormAvailable);
  const formResultRequired = useSelector(TaskFormSlice.getTaskFormStatusTaskFormRequired);
  const formResultResume = useSelector(TaskFormSlice.getFormResultResume)?.value;

  const isResumeNeed = formResultResume === '?????????????????? ????????????';

  const sortTypeInbox = useSelector(TaskInboxSlice.getSortTasksInbox);
  const sortTypeInWork = useSelector(TaskInWorkSlice.getSortTasksInWork);
  const sortTypeCompleted = useSelector(TaskCompletedSlice.getSortTasksCompleted);
  const sortTypeFailed = useSelector(TaskFailedSlice.getSortTasksFailed);

  const descriptionStatus = useSelector(TaskFormSlice.getDescriptionStatusCheck);
  const titleStatus = useSelector(TaskFormSlice.getTitleStatusCheck);
  const storageFilesStatus = useSelector(TaskFormSlice.getStorageStatusCheck);

  const loadingStatus = isLoadingStatusCheck(descriptionStatus)
  || isLoadingStatusCheck(titleStatus)
  || isLoadingStatusCheck(storageFilesStatus);

  const cancelHandle = () => {
    if (!loadingStatus) {
      if (status?.name === '??????????????') {
        dispatch(
          TaskInboxSlice.getTasksAsync({
            sort: sortTypeInbox,
            per_page: paginationInbox!.per_page,
            page: paginationInbox!.page_current,
            ...filters,
          }),
        );
      }
      if (status?.name === '?? ????????????') {
        dispatch(
          TaskInWorkSlice.getTasksAsync({
            sort: sortTypeInWork,
            per_page: paginationInWork!.per_page,
            page: paginationInWork!.page_current,
            ...filters,
          }),
        );
      }
      if (status?.name === '??????????????????') {
        dispatch(
          TaskCompletedSlice.getTasksAsync({
            sort: sortTypeCompleted,
            per_page: paginationInCompleted!.per_page,
            page: paginationInCompleted!.page_current,
            ...filters,
          }),
        );
      }
      if (status?.name === '???? ??????????????????') {
        dispatch(
          TaskFailedSlice.getTasksAsync({
            sort: sortTypeFailed,
            per_page: paginationInFailed!.per_page,
            page: paginationInFailed!.page_current,
            ...filters,
          }),
        );
      }
      dispatch(TaskFormSlice.hiddenTaskForm());
    }

    navigate('/');
  };

  useEffect(() => {
    if (checkPermission('get.alertNeedResume', rolesArray)
        && visible && formAvailable && formResultRequired && isResumeNeed) {
      alert('?????????????????? ????????????', 'info');
    }
  }, [formResultRequired, isResumeNeed]);

  return (
    <Modal
      {...props}
      onCancel={cancelHandle}
      width="75%"
      footer={null}
      className={styles.taskModal}
    >
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
                header={CollapseHeader({ name: '????????????', children: '' })}
                showArrow={false}
              >
                {task && <Details taskId={task.task_id} />}
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
