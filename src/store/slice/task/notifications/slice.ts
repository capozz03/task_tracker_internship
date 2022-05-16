import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { getNotificationsAsync } from './asyncThunk';
import {
  TNotification,
  TNotificationsResponse,
} from './entities';
import { TPagination } from 'store/slice/task/entities';

type TNotificationReducer = {
  notifications: TNotification[];
  pagination: TPagination;
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
    per_page: 50,
  },
  status: RequestStatuses.IDLE,
  error: null,
} as TNotificationReducer;

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [getNotificationsAsync.pending.type]: (state) => {
      state.status = RequestStatuses.LOADING;
    },
    [getNotificationsAsync.fulfilled.type]: (state,
      { payload: subscribes }: PayloadAction<TNotificationsResponse>) => {
      state.status = RequestStatuses.SUCCESS;
      state.notifications = subscribes.data;
    },
    [getNotificationsAsync.rejected.type]: (state, { payload: error }: PayloadAction<Error>) => {
      state.status = RequestStatuses.FAILURE;
      state.error = error;
    },
  },
});

export const notificationReducer = notificationSlice.reducer;
