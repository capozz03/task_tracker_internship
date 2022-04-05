import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskService } from './taskInWorkService';

export const getTasksAsync = createAsyncThunk(
  'taskInWork/getTask',
  async (_: void, { rejectWithValue }) => {
    try {
      const { data } = await taskService.getTasks();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
