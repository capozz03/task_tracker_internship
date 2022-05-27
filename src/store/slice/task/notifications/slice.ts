import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { getNotificationsAsync, pushNotificationsAsync, readAllNotificationAsync } from './asyncThunk';
import {
  TNotification,
  TNotificationsResponse, TToggleReadStatusProps,
} from './entities';
import { TPagination } from 'store/slice/task/entities';

export type TNotificationReducer = {
  notifications: TNotification[];
  pagination: TPagination;
  isVisible: boolean,
  status: RequestStatuses;
  error: null | Error;
}

const initialState = {
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
  reducers: {
    nextPage(state) {
      state.pagination.page_current += 1;
      return state;
    },
    toggleVisible(state) {
      state.isVisible = !state.isVisible;
      return state;
    },
    clearNotifications(state) {
      state = initialState;
      return state;
    },
    toggleReadStatus(state, { payload }: PayloadAction<TToggleReadStatusProps>) {
      state.notifications = state.notifications.map((notification) => {
        if (payload.listNotificationId.includes(notification.subscribe_notify_id)) {
          notification.viewed = payload.status === undefined
            ? !notification.viewed
            : payload.status;
          if (notification.viewed) {
            state.pagination.items_total -= 1;
          } else {
            state.pagination.items_total += 1;
          }
        }
        return notification;
      });
      return state;
    },
  },
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
  toggleVisible,
  nextPage } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
