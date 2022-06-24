import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import {
  appendNotificationsAsync,
  getNotificationsAsync,
  pushNotificationsAsync,
  readAllNotificationAsync,
} from './asyncThunk';
import { TNotification, TNotificationReducer, TNotificationsResponse } from './entities';
import reducers from './actions';
import lodash from 'lodash';

export const initialState = {
  notifications: [] as TNotification[],
  pagination: {
    items_count: 0,
    items_total: 0,
    page_current: 1,
    page_total: 0,
    per_page: 10,
  },
  isVisible: false,
  status: RequestStatuses.IDLE,
  error: null,
} as TNotificationReducer;

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState,
  reducers,
  extraReducers: {
    [getNotificationsAsync.pending.type]: (state) => {
      state.status = RequestStatuses.LOADING;
      return state;
    },
    [getNotificationsAsync.fulfilled.type]: (state,
      { payload: notifications }: PayloadAction<TNotificationsResponse>) => {
      state.status = RequestStatuses.SUCCESS;
      state.notifications = notifications.data;
      state.pagination = notifications.pagination;
      return state;
    },
    [getNotificationsAsync.rejected.type]: (state, { payload: error }: PayloadAction<Error>) => {
      state.status = RequestStatuses.FAILURE;
      state.error = error;
      return state;
    },
    // Добавление уведомлений в конец списка
    [pushNotificationsAsync.pending.type]: (state) => {
      state.status = RequestStatuses.LOADING;
      return state;
    },
    [pushNotificationsAsync.fulfilled.type]: (state,
      { payload: notifications }: PayloadAction<TNotificationsResponse>) => {
      state.status = RequestStatuses.SUCCESS;
      state.notifications = lodash.uniqBy(state.notifications.concat(notifications.data),
        (notification) => notification.subscribe_notify_id);
      state.pagination = notifications.pagination;
      return state;
    },
    [pushNotificationsAsync.rejected.type]: (state,
      { payload: error }: PayloadAction<Error>) => {
      state.status = RequestStatuses.FAILURE;
      state.error = error;
      return state;
    },
    // Добавление уведомлений в начало списка
    [appendNotificationsAsync.pending.type]: (state) => {
      state.status = RequestStatuses.LOADING;
      return state;
    },
    [appendNotificationsAsync.fulfilled.type]: (state,
      { payload: notifications }: PayloadAction<TNotificationsResponse>) => {
      state.status = RequestStatuses.SUCCESS;
      state.notifications.unshift(...notifications.data);
      state.pagination.page_total = notifications.pagination.page_total;
      state.pagination.items_total = notifications.pagination.items_total;
      return state;
    },
    [appendNotificationsAsync.rejected.type]: (state,
      { payload: error }: PayloadAction<Error>) => {
      state.status = RequestStatuses.FAILURE;
      state.error = error;
      return state;
    },
    [readAllNotificationAsync.fulfilled.type]: (state) => {
      state.pagination.items_total = 0;
    },
  },
});

export const {
  toggleReadStatus,
  clearNotifications,
  showNotification,
  hiddenNotification,
  nextPage } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
