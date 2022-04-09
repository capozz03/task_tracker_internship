import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskService } from './taskCompletedService';
import { TTaskSearch, TTasksReducer, TTaskStatusChange } from '../entities';

export const getTasksAsync = createAsyncThunk(
  'taskCompleted/getTask',
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
  'taskCompleted/getTask',
  async (params: TTaskStatusChange, { rejectWithValue, dispatch, getState }) => {
    try {
      const { taskCompleted } = getState() as { taskCompleted: TTasksReducer };
      await taskService.changeStatusTask({ ...params });
      dispatch(getTasksAsync({
        per_page: taskCompleted.pagination?.per_page,
        page: taskCompleted.pagination?.page_current,
      }));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
