import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { taskService } from './taskInWorkService';
import { TTaskSearch, TTasksReducer, TTaskStatusChange } from '../entities';
import { alert } from 'shared/ui';
import { TaskInWorkSlice, TaskInboxSlice, TaskCompletedSlice, TaskFailedSlice, TaskFormSlice } from 'store/slice';
import { TFiltersSlice } from '../taskFilters/slice';
import { TaskStatuses } from 'shared';

export const created = TaskStatuses.CREATED;
export const inWork = TaskStatuses.IN_WORK;
export const completed = TaskStatuses.COMPLETED;
export const notImplemented = TaskStatuses.FAILED;
export const rejectedId = TaskStatuses.REJECTED;

export const getTasksAsync = createAsyncThunk(
  'taskInWork/getTaskInWork',
  async (params: TTaskSearch, { rejectWithValue }) => {
    try {
      const { data } = await taskService.getTasks({ ...params, status_id: inWork });
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      return rejectWithValue(error);
    }
  },
);

export const changeStatusTaskAsync = createAsyncThunk(
  'taskInWork/changeStatusTask',
  async (params: TTaskStatusChange, { rejectWithValue, dispatch, getState }) => {
    try {
      const { taskInWork, taskFilters } = getState() as {
        taskInWork: TTasksReducer;
        taskFilters: TFiltersSlice;
      };
      const { data } = await taskService.changeStatusTask({ ...params });
      dispatch(
        TaskInWorkSlice.getTasksAsync({
          per_page: taskInWork.pagination?.per_page,
          page: taskInWork.pagination?.page_current,
          ...taskFilters.filters,
        }),
      );
      const state = getState() as any;
      if (data.data.status?.name === 'Создана') {
        const paginationInbox = state.taskInbox?.pagination;
        dispatch(
          TaskInboxSlice.getTasksAsync({
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
            per_page: paginationInFailed!.per_page,
            page: paginationInFailed!.page_current,
            ...taskFilters.filters,
          }),
        );
      }
      alert('Статус задачи изменен', 'success');
      dispatch(TaskFormSlice.resetTaskHistory());
      dispatch(TaskFormSlice.updateTask(data.data));
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Статус не изминен. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

export const createNewTaskAsync = createAsyncThunk(
  'taskInWork/createNewTaskTask',
  async (
    params: { title: string; task_status_id: string },
    { rejectWithValue, dispatch, getState },
  ) => {
    try {
      const { task_status_id: taskStatusID, title } = params;
      const { taskInWork, taskFilters } = getState() as {
        taskInWork: TTasksReducer;
        taskFilters: TFiltersSlice;
      };
      await taskService.createNewTask({ task_status_id: taskStatusID, title });
      dispatch(
        getTasksAsync({
          per_page: taskInWork.pagination?.per_page,
          page: taskInWork.pagination?.page_current,
          ...taskFilters.filters,
        }),
      );
      alert(
        `Задача "${title.slice(0, 25)}${title.length > 25 ? '...' : ''}" успешно создана`,
        'success',
      );
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert('Ошибка создания задачи', 'error');
      return rejectWithValue(error);
    }
  },
);
