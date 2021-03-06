import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { taskService } from './taskInWorkService';
import { TTaskSearch, TTasksReducer, TTaskStatusChange } from '../entities';
import { alert } from 'shared/ui';
import { TaskInWorkSlice, TaskInboxSlice, TaskCompletedSlice, TaskFailedSlice, TaskFormSlice } from 'store/slice';
import { TFiltersSlice } from '../taskFilters/slice';
import { TaskStatuses } from 'shared';
import { setFormResult } from '../taskForm';

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
      const { taskInbox, taskInWork, taskCompleted, taskFailed, taskFilters } = getState() as {
        taskInbox: TTasksReducer;
        taskInWork: TTasksReducer;
        taskCompleted: TTasksReducer;
        taskFailed: TTasksReducer;
        taskFilters: TFiltersSlice;
      };
      const { data } = await taskService.changeStatusTask({ ...params });
      dispatch(
        TaskInWorkSlice.getTasksAsync({
          sort: taskInWork.sort,
          per_page: taskInWork.pagination?.per_page,
          page: taskInWork.pagination?.page_current,
          ...taskFilters.filters,
        }),
      );
      dispatch(TaskFormSlice.setStatusTaskForm(data.data.status));
      const state = getState() as any;
      if (data.data.status?.name === '??????????????') {
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
      if (data.data.status?.name === '?? ????????????') {
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
      if (data.data.status?.name === '??????????????????') {
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
                { field_name: 'resume', value: '?????????????????? ????????????' },
                { field_name: 'comment', value: '' },
              ],
            },
          }),
        );
      }
      if (data.data.status?.name === '???? ??????????????????') {
        const paginationInFailed = state.taskFailed?.pagination;
        dispatch(
          TaskFailedSlice.getTasksAsync({
            sort: taskFailed.sort,
            per_page: paginationInFailed!.per_page,
            page: paginationInFailed!.page_current,
            ...taskFilters.filters,
          }),
        );
        dispatch(
          setFormResult({
            form_result: {
              taskId: params.task_id,
              formResult: [
                { field_name: 'resume', value: '?????????????????? ????????????' },
                { field_name: 'comment', value: '' },
              ],
            },
          }),
        );
      }
      alert('???????????? ???????????? ??????????????', 'success');
      dispatch(TaskFormSlice.resetTaskHistory());
      dispatch(TaskFormSlice.updateTask(data.data));
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`???????????? ???? ??????????????. ????????????: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

export const createNewTaskAsync = createAsyncThunk(
  'taskInWork/createNewTaskTask',
  async (
    params: { title: string; task_status_id: string, isResumeNeed?: boolean, },
    { rejectWithValue, dispatch, getState },
  ) => {
    try {
      const { task_status_id: taskStatusID, title } = params;
      const { taskInWork, taskFilters } = getState() as {
        taskInWork: TTasksReducer;
        taskFilters: TFiltersSlice;
      };
      const form = {};
      if (params.isResumeNeed) {
        await taskService.createNewTask({ task_status_id: taskStatusID, title, form });
      } else {
        await taskService.createNewTask({ task_status_id: taskStatusID, title });
      }
      dispatch(
        getTasksAsync({
          sort: taskInWork.sort,
          per_page: taskInWork.pagination?.per_page,
          page: taskInWork.pagination?.page_current,
          ...taskFilters.filters,
        }),
      );
      alert(
        `???????????? "${title.slice(0, 25)}${title.length > 25 ? '...' : ''}" ?????????????? ??????????????`,
        'success',
      );
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert('???????????? ???????????????? ????????????', 'error');
      return rejectWithValue(error);
    }
  },
);
