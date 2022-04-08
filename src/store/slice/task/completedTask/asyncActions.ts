import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskService } from './completedTaskService';
import { TTaskSearch, TTasksReducer, TTaskStatusChange } from '../entities';

export const getTasksAsync = createAsyncThunk(
  'completedTask/getTask',
  async (params: TTaskSearch, { rejectWithValue }) => {
    try {
      const { data } = await taskService.getTasks({ ...params, status_id: '8536592a-7340-4e10-ac4b-a280652c9310' });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const changeStatusTaskAsync = createAsyncThunk(
  'completedTask/getTask',
  async (params: TTaskStatusChange, { rejectWithValue, dispatch, getState }) => {
    try {
      const { completedTask } = getState() as { completedTask: TTasksReducer };
      await taskService.changeStatusTask({ ...params });
      dispatch(getTasksAsync({
        per_page: completedTask.pagination?.per_page,
        page: completedTask.pagination?.page_current,
      }));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
