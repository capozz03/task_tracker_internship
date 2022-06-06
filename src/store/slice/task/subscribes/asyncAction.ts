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
  async (subscribeId: string, { rejectWithValue }) => {
    try {
      const { data } = await subscribeServices.removeSubscribe(subscribeId);
      alert('Вы отписаны от уведомлений по задаче', 'info');
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert('Ошибка при удаление подписки', 'error');
      return rejectWithValue(error);
    }
  },
);

export const removeSubscribeThroughTaskId = createAsyncThunk(
  'subscribeSlice/removeSubscribe',
  async (taskId: string, { rejectWithValue }) => {
    try {
      const { data: subscribe } = await subscribeServices.getSubscribe({ relation_id: taskId, relation_type: 'task' });
      const { data } = await subscribeServices.removeSubscribe(subscribe.data[0].subscribe_id);
      alert('Вы отписаны от уведомлений по задаче', 'info');
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert('Ошибка при удаление подписки', 'error');
      return rejectWithValue(error);
    }
  },
);
