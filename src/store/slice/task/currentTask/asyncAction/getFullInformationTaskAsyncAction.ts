import { createAsyncThunk } from '@reduxjs/toolkit';
import { currentTaskServices } from '../services';

export const getFullInformationTaskAsync = createAsyncThunk(
  'currentTaskSlice/getFullInformationTask',
  async (taskId:string, { rejectWithValue }) => {
    try {
      const { data } = await currentTaskServices.getFullInformationTask(taskId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
