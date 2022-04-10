import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskService } from './taskInWorkService';
import { TTaskSearch, TTasksReducer, TTaskStatusChange } from '../entities';

export const created = 'cbb7199e-cb25-4dce-bf4e-24a8a5e07ef2';
export const inWork = '372d63ff-3ae3-4be2-a606-38940d7f8c8f';
export const completed = '8536592a-7340-4e10-ac4b-a280652c9310';
export const notImplemented = '599f5d03-1ef0-4a5b-a18c-33a4f44c4610';
export const rejectedId = '4658859a-32a6-4206-838a-c0064f147299';

export const getTasksAsync = createAsyncThunk(
  'taskInWork/getTask',
  async (params: TTaskSearch, { rejectWithValue }) => {
    try {
      const { data } = await taskService.getTasks({ ...params, status_id: inWork });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const changeStatusTaskAsync = createAsyncThunk(
  'taskInWork/changeStatusTask',
  async (params: TTaskStatusChange, { rejectWithValue, dispatch, getState }) => {
    try {
      const { taskInWork } = getState() as { taskInWork: TTasksReducer };
      await taskService.changeStatusTask({ ...params });
      dispatch(getTasksAsync({
        per_page: taskInWork.pagination?.per_page,
        page: taskInWork.pagination?.page_current,
      }));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createNewTaskAsync = createAsyncThunk(
  'taskInWork/createNewTaskTask',
  async (params: { title: string; task_status_id: string; },
    { rejectWithValue, dispatch, getState }) => {
    try {
      const { task_status_id: taskStatusID, title } = params;
      const { taskInWork } = getState() as { taskInWork: TTasksReducer };
      await taskService.createNewTask({ task_status_id: taskStatusID, title });
      dispatch(getTasksAsync({
        per_page: taskInWork.pagination?.per_page,
        page: taskInWork.pagination?.page_current,
      }));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const duplicateTaskAsync = createAsyncThunk(
  'taskInWork/duplicateTask',
  async (taskId: string,
    { rejectWithValue, dispatch, getState }) => {
    try {
      const { taskInWork } = getState() as { taskInWork: TTasksReducer };
      await taskService.duplicateTask(taskId);
      dispatch(getTasksAsync({
        per_page: taskInWork.pagination?.per_page,
        page: taskInWork.pagination?.page_current,
      }));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteTaskAsync = createAsyncThunk(
  'taskInWork/deleteTask',
  async (taskId: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const { taskInWork } = getState() as { taskInWork: TTasksReducer };
      await taskService.deleteTask(taskId);
      dispatch(getTasksAsync({
        per_page: taskInWork.pagination?.per_page,
        page: taskInWork.pagination?.page_current,
      }));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
