import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { taskService } from './taskInboxService';
import { TTaskSearch, TTasksReducer, TTaskStatusChange } from '../entities';
import { alert } from 'shared/ui';
import { TaskInWorkSlice, TaskInboxSlice, TaskCompletedSlice } from 'store/slice';

export const getTasksAsync = createAsyncThunk(
  'taskInbox/getTask',
  async (params: TTaskSearch, { rejectWithValue }) => {
    try {
      const { data } = await taskService.getTasks({
        ...params,
        status_id: 'cbb7199e-cb25-4dce-bf4e-24a8a5e07ef2',
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const changeStatusTaskAsync = createAsyncThunk(
  'taskInbox/getTask',
  async (params: TTaskStatusChange, { rejectWithValue, dispatch, getState }) => {
    try {
      const { taskInbox } = getState() as { taskInbox: TTasksReducer };
      const { data } = await taskService.changeStatusTask({ ...params });
      dispatch(
        getTasksAsync({
          per_page: taskInbox.pagination?.per_page,
          page: taskInbox.pagination?.page_current,
        }),
      );
      const state = getState() as any;
      if (data.data.status?.name === 'Создана') {
        const paginationInbox = state.taskInbox?.pagination;
        dispatch(TaskInboxSlice.getTasksAsync({
          per_page: paginationInbox!.per_page,
          page: paginationInbox!.page_current }));
      }
      if (data.data.status?.name === 'В работе') {
        const paginationInWork = state.taskInWork?.pagination;
        dispatch(TaskInWorkSlice.getTasksAsync({
          per_page: paginationInWork!.per_page,
          page: paginationInWork!.page_current }));
      }
      if (data.data.status?.name === 'Выполнена' || data.data.status?.name === 'Не выполнена') {
        const paginationInCompleted = state.taskCompleted?.pagination;
        dispatch(TaskCompletedSlice.getTasksAsync({
          per_page: paginationInCompleted!.per_page,
          page: paginationInCompleted!.page_current }));
      }
      alert('Статус задачи изменен', 'success');
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Статус не изминен. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

export const createNewTaskAsync = createAsyncThunk(
  'taskInbox/createNewTaskTask',
  async (
    params: { title: string; task_status_id: string },
    { rejectWithValue, dispatch, getState },
  ) => {
    try {
      const { task_status_id: taskStatusID, title } = params;
      const { taskInbox } = getState() as { taskInbox: TTasksReducer };
      await taskService.createNewTask({ task_status_id: taskStatusID, title });
      dispatch(
        getTasksAsync({
          per_page: taskInbox.pagination?.per_page,
          page: taskInbox.pagination?.page_current,
        }),
      );
      alert('Задача успешно создана', 'success');
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Ошибка во создания задачи "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
export const duplicateTaskAsync = createAsyncThunk(
  'taskInbox/duplicateTask',
  async (taskId: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const { taskInbox } = getState() as { taskInbox: TTasksReducer };
      await taskService.duplicateTask(taskId);
      dispatch(
        getTasksAsync({
          per_page: taskInbox.pagination?.per_page,
          page: taskInbox.pagination?.page_current,
        }),
      );
      alert('Задача успешно скопирована', 'success');
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Ошибка во время создание копии задачи "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

export const deleteTaskAsync = createAsyncThunk(
  'taskInbox/deleteTask',
  async (taskId: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const { taskInbox } = getState() as { taskInbox: TTasksReducer };
      await taskService.deleteTask(taskId);
      dispatch(
        getTasksAsync({
          per_page: taskInbox.pagination?.per_page,
          page: taskInbox.pagination?.page_current,
        }),
      );
      alert('Задача успешно удалена', 'success');
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Ошибка во время удалена задачи "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
