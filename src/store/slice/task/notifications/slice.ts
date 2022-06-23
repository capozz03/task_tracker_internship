import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { getNotificationsAsync, pushNotificationsAsync, readAllNotificationAsync } from './asyncThunk';
import { TNotificationReducer, TNotificationsResponse } from './entities';
import reducers from './actions';

export const initialState = {
  notifications: [],
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
    // Добавление уведомлений
    [pushNotificationsAsync.pending.type]: (state) => {
      state.status = RequestStatuses.LOADING;
      return state;
    },
    [pushNotificationsAsync.fulfilled.type]: (state,
      { payload: notifications }: PayloadAction<TNotificationsResponse>) => {
      state.status = RequestStatuses.SUCCESS;
      state.notifications = state.notifications.concat(notifications.data);
      state.pagination = notifications.pagination;
      return state;
    },
    [pushNotificationsAsync.rejected.type]: (state,
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
