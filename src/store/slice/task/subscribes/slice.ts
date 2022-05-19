import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { addSubscribe, getSubscribeAsync, removeSubscribe } from './asyncAction';
import {
  TAddOrRemoveSubscribeResponse,
  TSubscribe,
  TSubscribeListResponse,
} from './entities';
import { TPagination } from 'store/slice/task/entities';

type TNotificationReducer = {
  subscribes: TSubscribe[];
  pagination: TPagination;
  status: RequestStatuses;
  error: null | Error;
}

const initialState = {
  subscribes: [],
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

const subscribeSlice = createSlice({
  name: 'subscribeSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [getSubscribeAsync.pending.type]: (state) => {
      state.status = RequestStatuses.LOADING;
    },
    [getSubscribeAsync.fulfilled.type]: (state,
      { payload: subscribes }: PayloadAction<TSubscribeListResponse>) => {
      state.status = RequestStatuses.SUCCESS;
      state.subscribes = subscribes.data;
    },
    [getSubscribeAsync.rejected.type]: (state, { payload: error }: PayloadAction<Error>) => {
      state.status = RequestStatuses.FAILURE;
      state.error = error;
    },
    // Подписка на задачу
    [addSubscribe.pending.type]: (state) => {
      state.status = RequestStatuses.LOADING;
    },
    [addSubscribe.fulfilled.type]: (state,
      { payload: subscribes }: PayloadAction<TAddOrRemoveSubscribeResponse>) => {
      state.status = RequestStatuses.SUCCESS;
      state.subscribes = [...state.subscribes, subscribes.data];
    },
    [addSubscribe.rejected.type]: (state, { payload: error }: PayloadAction<Error>) => {
      state.status = RequestStatuses.FAILURE;
      state.error = error;
    },
    // Удаление подписки на задачу
    [removeSubscribe.pending.type]: (state) => {
      state.status = RequestStatuses.LOADING;
    },
    [removeSubscribe.fulfilled.type]: (state) => {
      state.status = RequestStatuses.SUCCESS;
      state.subscribes = [];
    },
    [removeSubscribe.rejected.type]: (state, { payload: error }: PayloadAction<Error>) => {
      state.status = RequestStatuses.FAILURE;
      state.error = error;
    },
  },
});

export const subscribeReducer = subscribeSlice.reducer;
