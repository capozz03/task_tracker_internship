import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTaskById } from './getTaskByIdServices';

export const getTaskByIdAsync = createAsyncThunk(
  'taskForm/getTaskByIdAsync',
  async (taskId:string, { rejectWithValue }) => {
    try {
      const { data } = await getTaskById(taskId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
