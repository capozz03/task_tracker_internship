import { createSlice } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';

type TNotificationReducer = {
  notifications: [],
  status: RequestStatuses;
}

const initialState = {
  notifications: [],
  status: RequestStatuses.IDLE,
} as TNotificationReducer;

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState,
  reducers: {},
});

export const notificationReducer = notificationSlice.reducer;
