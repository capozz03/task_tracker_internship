import React, { useCallback } from 'react';
import DetailCategory from 'features/Task/taskModalComponents/Details/DetailCategory';
import { TaskStatus } from 'features/Tasks/tasksComponents';
import { TStatus } from 'store/slice/task/entities';
import { TaskStatuses } from 'shared';
import { useDispatch } from 'react-redux';
import { TaskCompletedSlice, TaskFailedSlice, TaskInWorkSlice, TaskInboxSlice } from 'store/slice';

type TProps = {
  status: TStatus;
  currentTaskId: string | undefined;
};

const StatusCategory = ({ status, currentTaskId }: TProps) => {
  const dispatch = useDispatch();

  const statusChanger = (prevStatusId: string, taskId: string, newStatusId: string) => {
    const requestParams = { task_id: taskId, task_status_id: newStatusId };

    switch (prevStatusId) {
      case TaskStatuses.CREATED:
        dispatch(TaskInboxSlice.changeStatusTaskAsync(requestParams));
        break;
      case TaskStatuses.IN_WORK:
        dispatch(TaskInWorkSlice.changeStatusTaskAsync(requestParams));
        break;
      case TaskStatuses.COMPLETED:
        dispatch(TaskCompletedSlice.changeStatusTaskAsync(requestParams));
        break;
      case TaskStatuses.FAILED:
        dispatch(TaskFailedSlice.changeStatusTaskAsync(requestParams));
        break;
      default:
        break;
    }
  };

  const statusChangeHandler = useCallback((value: string) => (
    statusChanger(status?.task_status_id || '', currentTaskId || '', value)
  ), [status, currentTaskId]);

  return (
    <DetailCategory name="Статус" type="details">
      <TaskStatus
        defaultValue={status.name}
        onChange={statusChangeHandler}
      />
    </DetailCategory>
  );
};

export default StatusCategory;
