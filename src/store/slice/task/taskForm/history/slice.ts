import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { TState, TStateData } from './entities';
import { historyActions } from './actions';
import { getTaskHistoryAsync, updateFirstTaskHistoryUnitAsync } from './asyncActions';
import { initialState } from './initialState';

const taskFormHistorySlice = createSlice({
  name: 'taskFormHistory',
  initialState,
  reducers: historyActions,
  extraReducers: {
    [getTaskHistoryAsync.pending.type]: (state: TState) => ({
      ...state,
      status: RequestStatuses.LOADING,
      error: null,
    }),
    [getTaskHistoryAsync.fulfilled.type]: (
      state: TState,
      { payload: data }: PayloadAction<TStateData>,
    ) => ({
      ...state,
      status: RequestStatuses.SUCCESS,
      error: null,
      data: {
        pagination: data.pagination,
        data: [...state.data.data, ...data.data],
      },
    }),
    [getTaskHistoryAsync.rejected.type]: (
      state: TState,
      { payload: error }: PayloadAction<Error>,
    ) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      error,
    }),

    [updateFirstTaskHistoryUnitAsync.pending.type]: (state: TState) => ({
      ...state,
      status: RequestStatuses.LOADING,
      error: null,
    }),
    [updateFirstTaskHistoryUnitAsync.fulfilled.type]: (
      state: TState,
      { payload: data }: PayloadAction<TStateData>,
    ) => ({
      ...state,
      // TODO
      status: RequestStatuses.SUCCESS,
      error: null,
      data: {
        pagination: data.pagination,
        data: [...state.data.data, ...data.data],
      },
    }),
    [updateFirstTaskHistoryUnitAsync.rejected.type]: (
      state: TState,
      { payload: error }: PayloadAction<Error>,
    ) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      error,
    }),
  },
});

export const { resetTaskHistory } = taskFormHistorySlice.actions;
export const taskFormHistoryReducer = taskFormHistorySlice.reducer;
const selectSelf = (state: any) => state;
export const taskFormHistorySelector = createSelector(selectSelf, (state: any) => state.data);
