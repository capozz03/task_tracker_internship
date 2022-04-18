import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDescription } from './service';
import { setDescriptionFromTaskForm } from '../slice';

type changeDescriptionTaskProps = {
  data: {
    taskId: string;
    description: string;
  };
  successHandle: () => void;
  errorHandle: () => void;
};

export const setDescriptionAsync = createAsyncThunk(
  'taskForm/setDescriptionAsync',
  async (
    { data: { description, taskId }, successHandle, errorHandle }: changeDescriptionTaskProps,
    { rejectWithValue, dispatch },
  ) => {
    try {
      const { data } = await setDescription(taskId, description);
      successHandle();
      dispatch(setDescriptionFromTaskForm(data.data.description));
    } catch (error) {
      errorHandle();
      return rejectWithValue(error);
    }
  },
);
