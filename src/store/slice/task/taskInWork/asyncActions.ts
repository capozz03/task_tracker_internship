import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskService } from './taskInWorkService';
import { TTaskSearch, TTasksReducer, TTaskStatusChange } from '../entities';

const statusId = '372d63ff-3ae3-4be2-a606-38940d7f8c8f';

export const getTasksAsync = createAsyncThunk(
  'taskInWork/getTask',
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
