import { createSelector, createSlice, PayloadAction, AsyncThunk } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { mainSliceActions } from './actions';
import { getPostsAsync } from './asyncActions';
import { TMainReducer, TPosts } from './entities';

const initialState: TMainReducer = {
  todo: [{ id: 1, title: 'TODO 1' }],
  status: RequestStatuses.IDLE,
  posts: null,
  error: null,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: mainSliceActions,
});

const createBaseAsyncSlice = (
  sliceName: string,
  initialValue: TMainReducer,
  action: AsyncThunk<any, void, {}>,
  resetAction: any) => createSlice(
  {
    name: sliceName,
    initialState: initialValue,
    reducers: resetAction,
    extraReducers: {
      [action.pending.type]: (state: TMainReducer) => {
        state.status = RequestStatuses.LOADING;
      },
      [action.fulfilled.type]: (
        state: TMainReducer,
        { payload: posts }: PayloadAction<TPosts[]>) => {
        state.status = RequestStatuses.SUCCESS;
        state.posts = posts;
      },
      [action.rejected.type]: (state: TMainReducer, { payload: error }: PayloadAction<Error>) => {
        state.status = RequestStatuses.FAILURE;
        state.posts = null;
        state.error = error;
      },
    },
  });

const getPostsSlice = createBaseAsyncSlice('getPosts', initialState, getPostsAsync, null);

export const { addTodo } = mainSlice.actions;
export const mainReducer = mainSlice.reducer;
const selectSelf = (state: any) => state;
export const testSelector = createSelector(selectSelf, (state: any) => state.main.todo);
