import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { alert } from 'shared';
import { historyServices } from './services';

export const getCommandListAsync = createAsyncThunk(
  'historySlice/getCommandListAsync',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await historyServices.getCommandListService();
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert('Ошибка при получении списка зарегестрированных команд', 'error');
      return rejectWithValue(error);
    }
  },
);
