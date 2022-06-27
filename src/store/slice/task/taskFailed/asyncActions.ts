import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { taskService } from './taskFailedService';
import { TTaskSearch, TTasksReducer, TTaskStatusChange } from '../entities';
import { TaskInWorkSlice, TaskInboxSlice, TaskCompletedSlice, TaskFailedSlice, TaskFormSlice } from 'store/slice';
import { TFiltersSlice } from '../taskFilters/slice';
import { TaskStatuses, alert } from 'shared';
import { setFormResult } from '../taskForm';

const statusId = TaskStatuses.FAILED;

export const getTasksAsync = createAsyncThunk(
  'taskFailed/gettaskFailed',
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
  'taskFailed/getTask',
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
          sort: taskFailed.sort,
          per_page: taskFailed.pagination?.per_page,
          page: taskFailed.pagination?.page_current,
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
        dispatch(
          setFormResult({
            form_result: {
              taskId: params.task_id,
              formResult: [
                { field_name: 'resume', value: 'Требуется резюме' },
                { field_name: 'comment', value: '' },
              ],
            },
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
      alert('Статус задачи изменен', 'success');
      dispatch(TaskFormSlice.resetTaskHistory());
      dispatch(TaskFormSlice.updateTask(data.data));
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Статус не изменен. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
