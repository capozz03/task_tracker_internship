import { createAsyncThunk } from '@reduxjs/toolkit';
import { setTitle } from './service';
import { setTitleFromTaskForm } from '../slice';

type changeTitleTaskProps = {
  data: {
    taskId: string,
    title: string,
  },
  successHandle: () => void,
  errorHandle: () => void,
}

export const setTitleAsync = createAsyncThunk(
  'taskForm/setTitleAsync',
  async ({
    data: { title, taskId },
    successHandle,
    errorHandle } :changeTitleTaskProps, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await setTitle(taskId, title);
      successHandle();
      dispatch(setTitleFromTaskForm(data.data.title));
      return data;
    } catch (error) {
      errorHandle();
      return rejectWithValue(error);
    }
  },
);
