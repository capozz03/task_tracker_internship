import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { getTasksAsync } from './asyncActions';
import { TTasksReducer, TTasksResponse } from '../entities';

const initialState = {
  tasks: null,
  pagination: {
    items_count: 1,
    items_total: 1,
    page_current: 1,
    page_total: 1,
    per_page: 3,
  },
  status: RequestStatuses.IDLE,
  error: null,
} as TTasksReducer;

const taskInWorkSlice = createSlice({
  name: 'taskInWorkSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [getTasksAsync.pending.type]: (state) => ({
      ...state,
      status: RequestStatuses.LOADING,
    }),
    [getTasksAsync.fulfilled.type]: (state, { payload: data }: PayloadAction<TTasksResponse>) => ({
      ...state,
      status: RequestStatuses.SUCCESS,
      tasks: data?.data,
      pagination: data?.pagination,
    }),
    [getTasksAsync.rejected.type]: (state, { payload: error }: PayloadAction<Error>) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      tasks: null,
      pagination: null,
      error,
    }),
  },
});

export const taskInWorkReducer = taskInWorkSlice.reducer;
const selectSelf = (state: any) => state;
export const testSelector = createSelector(selectSelf, (state: any) => state.taskInWork.tasks);
