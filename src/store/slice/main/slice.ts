import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { mainSliceActions } from './actions';
import { getPostsAsync } from './asyncActions';
import { TMainReducer, TPosts } from './entities';

const initialState = {
  todo: [{ id: 1, title: 'TODO 1' }],
  status: RequestStatuses.IDLE,
  posts: null,
  error: null,
} as TMainReducer;

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: mainSliceActions,
  extraReducers: {
    [getPostsAsync.pending.type]: (state) => ({
      ...state,
      status: RequestStatuses.LOADING,
    }),
    [getPostsAsync.fulfilled.type]: (state, { payload: posts }: PayloadAction<TPosts[]>) => ({
      ...state,
      status: RequestStatuses.SUCCESS,
      posts,
    }),
    [getPostsAsync.rejected.type]: (state, { payload: error }: PayloadAction<Error>) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      posts: null,
      error,
    }),
  },
});

export const { addTodo } = mainSlice.actions;
export const mainReducer = mainSlice.reducer;
const selectSelf = (state: any) => state;
export const testSelector = createSelector(selectSelf, (state: any) => state.main.todo);
