import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { getTasksAsync } from './asyncActions';
import { TPagination, TSortType, TTask, TTasksReducer, TTasksResponse } from '../entities';

const initialState = {
  sort: 'date~DESC',
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

const taskCompletedSlice = createSlice({
  name: 'taskCompletedSlice',
  initialState,
  reducers: {
    setSortTasksCompleted(state, { payload }: PayloadAction<TSortType | undefined>) {
      state.sort = payload;
    },
    taskUpdate(state, { payload }: PayloadAction<TTask>) {
      state.tasks = state.tasks!.map((task) =>
        (task.task_id === payload.task_id ? payload : task));
    },
    setPaginationTasksCompleted(state, { payload: pagination }: PayloadAction<TPagination | null>) {
      state.pagination = pagination;
    },
    resetPagination(state) {
      state.pagination = initialState.pagination;
    },
  },
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

export const {
  setSortTasksCompleted,
  taskUpdate,
  resetPagination,
  setPaginationTasksCompleted,
} = taskCompletedSlice.actions;
export const taskCompletedReducer = taskCompletedSlice.reducer;
