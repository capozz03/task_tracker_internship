import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { alert } from 'shared';
import { notificationServices } from './services';
import { TChangeViewerRequest, TNotifiesRequest, TNotificationReducer } from './entities';
import { toggleReadStatus } from 'store/slice/task/notifications/slice';

export type getNotificationsProps = {
  viewed?: boolean,
  include?: string[],
  per_page?: number,
  page?: number,
  attach?: boolean,
}

// Получение уведомлений
export const getNotificationsAsync = createAsyncThunk(
  'notificationSlice/getNotificationsAsync',
  async ({ viewed, include, per_page: perPage, page }: getNotificationsProps,
    { rejectWithValue, getState }) => {
    try {
      const { notifications } = getState() as {
        notifications: TNotificationReducer,
      };
      const params: TNotifiesRequest = {
        viewed,
        per_page: perPage || notifications.pagination.per_page,
        page: page || notifications.pagination.page_current,
        include,
      };
      const { data } = await notificationServices.getNotifications(params);
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert('Ошибка при получении списка уведомлений', 'error');
      return rejectWithValue(error);
    }
  },
);

// Добавление уведомлений
export const pushNotificationsAsync = createAsyncThunk(
  'notificationSlice/pushNotificationsAsync',
  async ({ viewed, include }: getNotificationsProps, { rejectWithValue, getState }) => {
    try {
      const { notifications } = getState() as {
        notifications: TNotificationReducer,
      };
      const params: TNotifiesRequest = {
        viewed,
        per_page: notifications.pagination.per_page,
        page: notifications.pagination.page_current,
        include,
      };
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
export const toggleReadNotificationAsync = createAsyncThunk(
  'notificationSlice/toggleReadNotificationAsync',
  async (props: TChangeViewerRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await notificationServices.changeViewedNotification(props);
      dispatch(toggleReadStatus({
        listNotificationId: props.subscribe_notify_id,
        status: props.viewed,
      }));
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert('Ошибка при смене статуса прочитано / не прочитано', 'error');
      return rejectWithValue(error);
    }
  },
);

// Все уведомление просмотренны
export const readAllNotificationAsync = createAsyncThunk(
  'notificationSlice/readAllNotificationAsync',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data: notifications } = await notificationServices.getNotifications({
        viewed: false,
        page: 1,
        per_page: 10000000,
      });
      const listNotificationId = notifications.data.map((notification) =>
        notification.subscribe_notify_id);
      const { data } = await notificationServices.changeViewedNotification({
        subscribe_notify_id: listNotificationId,
        viewed: true,
      });
      dispatch(toggleReadStatus({
        listNotificationId,
        status: true,
      }));
      alert('Все уведомления прочитаны', 'success');
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert('Ошибка при прочтение всех записей', 'error');
      return rejectWithValue(error);
    }
  },
);
