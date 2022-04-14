import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTaskById } from './getTaskByIdServices';
import { toggleVisibleTaskForm } from '../slice';

export const getTaskByIdAsync = createAsyncThunk(
  'currentTaskSlice/getFullInformationTask',
  async (taskId:string, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await getTaskById(taskId);
      dispatch(toggleVisibleTaskForm());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
