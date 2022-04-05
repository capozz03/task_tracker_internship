import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { getTasksAsync } from './asyncActions';
import { TTask } from '../entities';

const initialState = {
  tasks: null,
  status: RequestStatuses.IDLE,
  error: null,
};

const taskInWorkSlice = createSlice({
  name: 'taskInWorkSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [getTasksAsync.pending.type]: (state) => ({
      ...state,
      status: RequestStatuses.LOADING,
    }),
    [getTasksAsync.fulfilled.type]: (state, { payload: posts }: PayloadAction<TTask[]>) => ({
      ...state,
      status: RequestStatuses.SUCCESS,
      posts,
    }),
    [getTasksAsync.rejected.type]: (state, { payload: error }: PayloadAction<Error>) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      posts: null,
      error,
    }),
  },
});

// export const { addTodo } = taskInWorkSlice.actions;
export const mainReducer = taskInWorkSlice.reducer;
// const selectSelf = (state: any) => state;
// export const testSelector = createSelector(selectSelf, (state: any) => state.main.todo);
