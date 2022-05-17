import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { alert } from 'shared';
import { subscribeServices } from './services';
import { TAddSubscribeRequest, TSubscribesProps } from './entities';

// Получение подписок
export const getSubscribeAsync = createAsyncThunk(
  'subscribeSlice/getSubscribeAsync',
  async (params: TSubscribesProps, { rejectWithValue }) => {
    try {
      const { data } = await subscribeServices.getSubscribe(params);
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert('Ошибка при получении списка подписок', 'error');
      return rejectWithValue(error);
    }
  },
);

export const addSubscribe = createAsyncThunk(
  'subscribeSlice/addSubscribe',
  async (params: TAddSubscribeRequest, { rejectWithValue }) => {
    try {
      const { data } = await subscribeServices.addSubscribe(params);
      alert('Вы подписаны на уведомления по задаче', 'info');
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert('Ошибка при подписке', 'error');
      return rejectWithValue(error);
    }
  },
);

export const removeSubscribe = createAsyncThunk(
  'subscribeSlice/removeSubscribe',
  async (subscribeID: string, { rejectWithValue }) => {
    try {
      const { data } = await subscribeServices.removeSubscribe(subscribeID);
      alert('Вы отписаны от уведомлений по задаче', 'info');
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert('Ошибка при удаление подписки', 'error');
      return rejectWithValue(error);
    }
  },
);
