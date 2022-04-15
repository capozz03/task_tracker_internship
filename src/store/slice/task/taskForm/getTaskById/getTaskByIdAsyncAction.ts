import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { getTaskById } from './getTaskByIdServices';
import { TaskFormSlice } from 'store/slice';
import { alert } from 'shared/ui';

export const getTaskByIdAsync = createAsyncThunk(
  'taskForm/getTaskByIdAsync',
  async (taskId:string, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await getTaskById(taskId);
      dispatch(TaskFormSlice.showTaskForm());
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось загрузить задачу. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
