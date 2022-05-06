import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { TTasksReducer } from '../../entities';
import { TaskInWorkSlice, TaskInboxSlice, TaskCompletedSlice } from 'store/slice';
import { taskService } from '../../taskInWork/taskInWorkService';
import { TFiltersSlice } from '../../taskFilters/slice';

export const created = 'cbb7199e-cb25-4dce-bf4e-24a8a5e07ef2';
export const inWork = '372d63ff-3ae3-4be2-a606-38940d7f8c8f';
export const completed = '8536592a-7340-4e10-ac4b-a280652c9310';
export const notImplemented = '599f5d03-1ef0-4a5b-a18c-33a4f44c4610';
export const rejectedId = '4658859a-32a6-4206-838a-c0064f147299';

type checkForStatusIdProps = {
  taskStatusId: string;
  taskInWork: TTasksReducer;
  taskInbox: TTasksReducer;
  taskCompleted: TTasksReducer;
};

const checkForStatusId = ({
  taskStatusId,
  taskInWork,
  taskInbox,
  taskCompleted,
}: checkForStatusIdProps) => {
  if (taskStatusId === created) {
    return taskInbox;
  }
  if (taskStatusId === inWork) {
    return taskInWork;
  }
  return taskCompleted;
};

type commonActionProps = {
  data: {
    taskId: string;
    taskStatusId: string;
  };
  resolvedHandle: () => void,
  rejectedHandle: () => void,
};

export const duplicateTaskAsync = createAsyncThunk(
  'tasks/duplicateTask',
  async (
    { data: { taskId, taskStatusId }, resolvedHandle, rejectedHandle }: commonActionProps,
    { rejectWithValue, dispatch, getState },
  ) => {
    try {
      const { taskInWork, taskInbox, taskCompleted, taskFilters } = getState() as {
        taskInWork: TTasksReducer;
        taskInbox: TTasksReducer;
        taskCompleted: TTasksReducer;
        taskFilters: TFiltersSlice;
      };
      await taskService.duplicateTask(taskId);
      const dataCheckStatus = { taskStatusId, taskInWork, taskInbox, taskCompleted };
      const stateOfDispatch = checkForStatusId(dataCheckStatus);
      if (taskStatusId === created) {
        dispatch(
          TaskInboxSlice.getTasksAsync({
            per_page: stateOfDispatch.pagination?.per_page,
            page: stateOfDispatch.pagination?.page_current,
            ...taskFilters.filters,
          }),
        );
      } else if (taskStatusId === inWork) {
        dispatch(
          TaskInWorkSlice.getTasksAsync({
            per_page: stateOfDispatch.pagination?.per_page,
            page: stateOfDispatch.pagination?.page_current,
            ...taskFilters.filters,
          }),
        );
      } else {
        dispatch(
          TaskCompletedSlice.getTasksAsync({
            per_page: stateOfDispatch.pagination?.per_page,
            page: stateOfDispatch.pagination?.page_current,
            ...taskFilters.filters,
          }),
        );
      }
      resolvedHandle();
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
      const { taskInWork, taskInbox, taskCompleted, taskFilters } = getState() as {
        taskInWork: TTasksReducer;
        taskInbox: TTasksReducer;
        taskCompleted: TTasksReducer;
        taskFilters: TFiltersSlice;
      };
      await taskService.deleteTask(taskId);
      const dataCheckStatus = { taskStatusId, taskInWork, taskInbox, taskCompleted };
      const stateOfDispatch = checkForStatusId(dataCheckStatus);
      if (taskStatusId === created) {
        dispatch(
          TaskInboxSlice.getTasksAsync({
            per_page: stateOfDispatch.pagination?.per_page,
            page: stateOfDispatch.pagination?.page_current,
            ...taskFilters.filters,
          }),
        );
      } else if (taskStatusId === inWork) {
        dispatch(
          TaskInWorkSlice.getTasksAsync({
            per_page: stateOfDispatch.pagination?.per_page,
            page: stateOfDispatch.pagination?.page_current,
            ...taskFilters.filters,
          }),
        );
      } else {
        dispatch(
          TaskCompletedSlice.getTasksAsync({
            per_page: stateOfDispatch.pagination?.per_page,
            page: stateOfDispatch.pagination?.page_current,
            ...taskFilters.filters,
          }),
        );
      }
      resolvedHandle();
    } catch (rejectedValueOrSerializedError) {
      rejectedHandle();
      const error = miniSerializeError(rejectedValueOrSerializedError);
      return rejectWithValue(error);
    }
  },
);
