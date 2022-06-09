import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { taskService } from './taskInboxService';
import { TTaskSearch, TTasksReducer, TTaskStatusChange } from '../entities';
import { alert } from 'shared/ui';
import { TaskInWorkSlice, TaskInboxSlice, TaskCompletedSlice, TaskFailedSlice, TaskFormSlice } from 'store/slice';
import { TFiltersSlice } from '../taskFilters/slice';
import { TaskStatuses } from 'shared';
import { setFormResult } from '../taskForm';

export const getTasksAsync = createAsyncThunk(
  'taskInbox/getTaskInboxInbox',
  async (params: TTaskSearch, { rejectWithValue }) => {
    try {
      const { data } = await taskService.getTasks({
        ...params,
        status_id: TaskStatuses.CREATED,
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
      dispatch(TaskFormSlice.setStatusTaskForm(data.data.status));
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
        dispatch(
          setFormResult({
            form_result: {
              taskId: params.task_id,
              formResult: [],
            },
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
        dispatch(
          setFormResult({
            form_result: {
              taskId: params.task_id,
              formResult: [],
            },
          }),
        );
      }
      alert('Статус задачи изменен', 'success');
      dispatch(TaskFormSlice.resetTaskHistory());
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Статус не изменен. Ошибка: "${error.message}"`, 'error');
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
      alert(
        `Задача "${title.slice(0, 25)}${title.length > 25 ? '...' : ''}" успешно создана`,
        'success',
      );
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Ошибка при создании задачи "${error.message}"`, 'error');
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
      alert(`Ошибка во время создания копии задачи "${error.message}"`, 'error');
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
      alert(`Ошибка во время удаления задачи "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
