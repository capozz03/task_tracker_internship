import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { alert } from 'shared';
import { notificationServices } from './services';
import { TNotifiesRequest } from './entities';

// Получение уведомлений
export const getNotificationsAsync = createAsyncThunk(
  'notificationSlice/getNotificationsAsync',
  async (params: TNotifiesRequest, { rejectWithValue }) => {
    try {
      const { data } = await notificationServices.getNotifications(params);
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert('Ошибка при получении списка уведомлений', 'error');
      return rejectWithValue(error);
    }
  },
);

// Сделать уведомление просмотренное / нет
