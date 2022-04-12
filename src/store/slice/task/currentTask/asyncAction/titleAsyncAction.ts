import { createAsyncThunk } from '@reduxjs/toolkit';
import { currentTaskServices } from '../services';

type changeTitleTaskProps = {
  taskId: string,
  title: string,
}

export const setTitleAsync = createAsyncThunk(
  'currentTaskSlice/setTitleAsync',
  async ({ title, taskId } :changeTitleTaskProps, { rejectWithValue }) => {
    try {
      const { data } = await currentTaskServices.getPosts(taskId, title);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
