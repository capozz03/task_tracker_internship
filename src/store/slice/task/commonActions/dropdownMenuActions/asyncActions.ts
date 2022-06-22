import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { TTasksReducer } from '../../entities';
import { TaskInWorkSlice, TaskInboxSlice, TaskCompletedSlice, TaskFailedSlice, TaskFormSlice } from 'store/slice';
import { taskService } from '../../taskInWork/taskInWorkService';
import { TFiltersSlice } from '../../taskFilters/slice';
import { clearState } from './slice';
import { TaskStatuses } from 'shared';
import { getTaskByIdAsync } from 'store/slice/task/taskForm';

export const created = TaskStatuses.CREATED;
export const inWork = TaskStatuses.IN_WORK;
export const completed = TaskStatuses.COMPLETED;
export const notImplemented = TaskStatuses.FAILED;
export const rejectedId = TaskStatuses.REJECTED;

type checkForStatusIdProps = {
  taskStatusId: string;
  taskInWork: TTasksReducer;
  taskInbox: TTasksReducer;
  taskCompleted: TTasksReducer;
  taskFailed: TTasksReducer;
};

const checkForStatusId = ({
  taskStatusId,
  taskInWork,
  taskInbox,
  taskCompleted,
  taskFailed,
}: checkForStatusIdProps) => {
  if (taskStatusId === created) {
    return taskInbox;
  }
  if (taskStatusId === inWork) {
    return taskInWork;
  }
  if (taskStatusId === completed) {
    return taskCompleted;
  }
  return taskFailed;
};

type commonActionProps = {
  data: {
    taskId: string;
    taskStatusId: string;
  };
  resolvedHandle: () => void;
  rejectedHandle: () => void;
  openTask?: boolean | undefined;
};

export const duplicateTaskAsync = createAsyncThunk(
  'tasks/duplicateTask',
  async (
    { data: { taskId, taskStatusId },
      resolvedHandle,
      rejectedHandle,
      openTask = false }: commonActionProps,
    { rejectWithValue, dispatch, getState },
  ) => {
    try {
      const { taskInWork, taskInbox, taskCompleted, taskFailed, taskFilters } = getState() as {
        taskInWork: TTasksReducer;
        taskInbox: TTasksReducer;
        taskCompleted: TTasksReducer;
        taskFailed: TTasksReducer;
        taskFilters: TFiltersSlice;
      };
      const { data } = await taskService.duplicateTask(taskId);
      const dataCheckStatus = { taskStatusId, taskInWork, taskInbox, taskCompleted, taskFailed };
      const stateOfDispatch = checkForStatusId(dataCheckStatus);
      if (taskStatusId === created) {
        dispatch(
          TaskInboxSlice.getTasksAsync({
            sort: taskInbox.sort,
            per_page: stateOfDispatch.pagination?.per_page,
            page: stateOfDispatch.pagination?.page_current,
            ...taskFilters.filters,
          }),
        );
      } else if (taskStatusId === inWork) {
        dispatch(
          TaskInWorkSlice.getTasksAsync({
            sort: taskInWork.sort,
            per_page: stateOfDispatch.pagination?.per_page,
            page: stateOfDispatch.pagination?.page_current,
            ...taskFilters.filters,
          }),
        );
      } else if (taskStatusId === completed) {
        dispatch(
          TaskCompletedSlice.getTasksAsync({
            sort: taskCompleted.sort,
            per_page: stateOfDispatch.pagination?.per_page,
            page: stateOfDispatch.pagination?.page_current,
            ...taskFilters.filters,
          }),
        );
      } else if (taskStatusId === notImplemented) {
        dispatch(
          TaskFailedSlice.getTasksAsync({
            sort: taskFailed.sort,
            per_page: stateOfDispatch.pagination?.per_page,
            page: stateOfDispatch.pagination?.page_current,
            ...taskFilters.filters,
          }),
        );
      }
      resolvedHandle();
      if (openTask) {
        dispatch(getTaskByIdAsync(data.clone.task_id));
      }
      if (!openTask) {
        dispatch(TaskFormSlice.resetTaskHistory());
      }
    } catch (rejectedValueOrSerializedError) {
      rejectedHandle();
      const error = miniSerializeError(rejectedValueOrSerializedError);
      return rejectWithValue(error);
    }
  },
);

export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTask',
  async (
    { data: { taskId, taskStatusId }, resolvedHandle, rejectedHandle }: commonActionProps,
    { rejectWithValue, dispatch, getState },
  ) => {
    try {
      const { taskInWork, taskInbox, taskCompleted, taskFailed, taskFilters } = getState() as {
        taskInWork: TTasksReducer;
        taskInbox: TTasksReducer;
        taskCompleted: TTasksReducer;
        taskFailed: TTasksReducer;
        taskFilters: TFiltersSlice;
      };
      await taskService.deleteTask(taskId);
      const dataCheckStatus = { taskStatusId, taskInWork, taskInbox, taskCompleted, taskFailed };
      const stateOfDispatch = checkForStatusId(dataCheckStatus);
      if (taskStatusId === created) {
        dispatch(
          TaskInboxSlice.getTasksAsync({
            sort: taskInbox.sort,
            per_page: stateOfDispatch.pagination?.per_page,
            page: stateOfDispatch.pagination?.page_current,
            ...taskFilters.filters,
          }),
        );
      } else if (taskStatusId === inWork) {
        dispatch(
          TaskInWorkSlice.getTasksAsync({
            sort: taskInWork.sort,
            per_page: stateOfDispatch.pagination?.per_page,
            page: stateOfDispatch.pagination?.page_current,
            ...taskFilters.filters,
          }),
        );
      } else if (taskStatusId === completed) {
        dispatch(
          TaskCompletedSlice.getTasksAsync({
            sort: taskCompleted.sort,
            per_page: stateOfDispatch.pagination?.per_page,
            page: stateOfDispatch.pagination?.page_current,
            ...taskFilters.filters,
          }),
        );
      } else if (taskStatusId === notImplemented) {
        dispatch(
          TaskFailedSlice.getTasksAsync({
            sort: taskFailed.sort,
            per_page: stateOfDispatch.pagination?.per_page,
            page: stateOfDispatch.pagination?.page_current,
            ...taskFilters.filters,
          }),
        );
      }
      resolvedHandle();
      dispatch(clearState());
    } catch (rejectedValueOrSerializedError) {
      rejectedHandle();
      const error = miniSerializeError(rejectedValueOrSerializedError);
      return rejectWithValue(error);
    }
  },
);
