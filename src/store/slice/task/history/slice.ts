import { createSlice } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { TCommand } from 'store/slice/task/history/entities';

type TNotificationReducer = {
  commandsList: TCommand[],
  status: RequestStatuses;
}

const initialState = {
  commandsList: [],
  status: RequestStatuses.IDLE,
} as TNotificationReducer;

const historySlice = createSlice({
  name: 'historySlice',
  initialState,
  reducers: {},
});

export const historyReducer = historySlice.reducer;
