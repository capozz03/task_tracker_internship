import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskService } from './taskInWorkService';

export const getTasksAsync = createAsyncThunk(
  'taskInWork/getTask',
  async (_: void, { rejectWithValue }) => {
    try {
      const { data } = await taskService.getTasks({ status_id: '372d63ff-3ae3-4be2-a606-38940d7f8c8f' });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
