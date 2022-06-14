import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskService } from './taskCompletedService';
import { TTaskSearch, TTasksReducer, TTaskStatusChange } from '../entities';
import { TaskInWorkSlice, TaskInboxSlice, TaskFailedSlice, TaskCompletedSlice, TaskFormSlice } from 'store/slice';
import { TFiltersSlice } from '../taskFilters/slice';
import { TaskStatuses } from 'shared';

const statusId = TaskStatuses.COMPLETED;

export const getTasksAsync = createAsyncThunk(
  'taskCompleted/getTaskCompleted',
  async (params: TTaskSearch, { rejectWithValue }) => {
    try {
      const { data } = await taskService.getTasks({ ...params, status_id: statusId });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const changeStatusTaskAsync = createAsyncThunk(
  'taskCompleted/getTask',
  async (params: TTaskStatusChange, { rejectWithValue, dispatch, getState }) => {
    try {
      const { taskInbox, taskInWork, taskCompleted, taskFailed, taskFilters } = getState() as {
        taskInbox: TTasksReducer;
        taskInWork: TTasksReducer;
        taskCompleted: TTasksReducer;
        taskFailed: TTasksReducer;
        taskFilters: TFiltersSlice;
      };
      const { data } = await taskService.changeStatusTask({ ...params });
      dispatch(
        getTasksAsync({
          sort: taskCompleted.sort,
          per_page: taskCompleted.pagination?.per_page,
          page: taskCompleted.pagination?.page_current,
          ...taskFilters.filters,
        }),
      );
      dispatch(TaskFormSlice.setStatusTaskForm(data.data.status));
      const state = getState() as any;
      if (data.data.status?.name === 'Создана') {
        const paginationInbox = state.taskInbox?.pagination;
        dispatch(
          TaskInboxSlice.getTasksAsync({
            sort: taskInbox.sort,
            per_page: paginationInbox!.per_page,
            page: paginationInbox!.page_current,
            ...taskFilters.filters,
          }),
        );
      }
      if (data.data.status?.name === 'В работе') {
        const paginationInWork = state.taskInWork?.pagination;
        dispatch(
          TaskInWorkSlice.getTasksAsync({
            sort: taskInWork.sort,
            per_page: paginationInWork!.per_page,
            page: paginationInWork!.page_current,
            ...taskFilters.filters,
          }),
        );
      }
      if (data.data.status?.name === 'Выполнена') {
        const paginationInCompleted = state.taskCompleted?.pagination;
        dispatch(
          TaskCompletedSlice.getTasksAsync({
            sort: taskCompleted.sort,
            per_page: paginationInCompleted!.per_page,
            page: paginationInCompleted!.page_current,
            ...taskFilters.filters,
          }),
        );
      }
      if (data.data.status?.name === 'Не выполнена') {
        const paginationInFailed = state.taskFailed?.pagination;
        dispatch(
          TaskFailedSlice.getTasksAsync({
            sort: taskFailed.sort,
            per_page: paginationInFailed!.per_page,
            page: paginationInFailed!.page_current,
            ...taskFilters.filters,
          }),
        );
      }
      dispatch(TaskFormSlice.resetTaskHistory());
      dispatch(TaskFormSlice.updateTask(data.data));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
