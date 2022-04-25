import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { taskService } from './taskInboxService';
import { TTaskSearch, TTasksReducer, TTaskStatusChange } from '../entities';
import { alert } from 'shared/ui';
import { TaskInWorkSlice, TaskInboxSlice, TaskCompletedSlice } from 'store/slice';
import { TFiltersSlice } from '../taskFilters/slice';

export const getTasksAsync = createAsyncThunk(
  'taskInbox/getTaskInboxInbox',
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
  'taskInbox/getTaskInbox',
  async (params: TTaskStatusChange, { rejectWithValue, dispatch, getState }) => {
    try {
      const { taskInbox, taskFilters } = getState() as {
        taskInbox: TTasksReducer;
        taskFilters: TFiltersSlice;
      };
      const { data } = await taskService.changeStatusTask({ ...params });
      dispatch(
        TaskInboxSlice.getTasksAsync({
          per_page: taskInbox.pagination?.per_page,
          page: taskInbox.pagination?.page_current,
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
      if (data.data.status?.name === 'Выполнена' || data.data.status?.name === 'Не выполнена') {
        const paginationInCompleted = state.taskCompleted?.pagination;
        dispatch(
          TaskCompletedSlice.getTasksAsync({
            per_page: paginationInCompleted!.per_page,
            page: paginationInCompleted!.page_current,
            ...taskFilters.filters,
          }),
        );
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
  'taskInbox/createNewTaskTaskInbox',
  async (
    params: { title: string; task_status_id: string },
    { rejectWithValue, dispatch, getState },
  ) => {
    try {
      const { task_status_id: taskStatusID, title } = params;
      const { taskInbox, taskFilters } = getState() as {
        taskInbox: TTasksReducer;
        taskFilters: TFiltersSlice;
      };
      await taskService.createNewTask({ task_status_id: taskStatusID, title });
      dispatch(
        TaskInboxSlice.getTasksAsync({
          per_page: taskInbox.pagination?.per_page,
          page: taskInbox.pagination?.page_current,
          ...taskFilters.filters,
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
  'taskInbox/duplicateTaskInbox',
  async (taskId: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const { taskInbox, taskFilters } = getState() as {
        taskInbox: TTasksReducer;
        taskFilters: TFiltersSlice;
      };
      await taskService.duplicateTask(taskId);
      dispatch(
        TaskInboxSlice.getTasksAsync({
          per_page: taskInbox.pagination?.per_page,
          page: taskInbox.pagination?.page_current,
          ...taskFilters.filters,
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
  'taskInbox/deleteTaskInbox',
  async (taskId: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const { taskInbox, taskFilters } = getState() as {
        taskInbox: TTasksReducer;
        taskFilters: TFiltersSlice;
      };
      await taskService.deleteTask(taskId);
      dispatch(
        TaskInboxSlice.getTasksAsync({
          per_page: taskInbox.pagination?.per_page,
          page: taskInbox.pagination?.page_current,
          ...taskFilters.filters,
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
