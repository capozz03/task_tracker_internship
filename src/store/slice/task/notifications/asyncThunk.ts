import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { alert } from 'shared';
import { notificationServices } from './services';

export const getCommandListAsync = createAsyncThunk(
  'notificationSlice/getSubscribesListAsync',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await notificationServices.getSubscribe();
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert('Ошибка при получении списка зарегестрированных команд', 'error');
      return rejectWithValue(error);
    }
  },
);
