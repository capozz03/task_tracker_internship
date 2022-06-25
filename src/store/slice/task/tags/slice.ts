import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTagsAsync } from './asyncAction';
import { RequestStatuses } from 'shared';
import { TTagsResponse, TTagFilterSlice } from './entities';
import reducers from './action';

const initialState = {
  currentTag: null,
  tags: [],
  pagination: {
    items_count: 4,
    items_total: 4,
    per_page: 500,
    page_current: 1,
    page_total: 1,
  },
  status: RequestStatuses.IDLE,
  error: null,
} as TTagFilterSlice;

const tagsFilterSlice = createSlice({
  name: 'tagsFilterSlice',
  initialState,
  reducers,
  extraReducers: {
    [getTagsAsync.pending?.type]: (state: TTagFilterSlice) => ({
      ...state,
      status: RequestStatuses.LOADING,
    }),
    [getTagsAsync.fulfilled?.type]: (state: TTagFilterSlice,
      { payload: tags }: PayloadAction<TTagsResponse>) => {
      state.tags = tags.data;
      state.status = RequestStatuses.SUCCESS;
      state.error = null;
      // const newState: TTagFilterSlice = { ...state };
      // newState.tags = [...tags.data];
      // newState.status = RequestStatuses.SUCCESS;
      // newState.error = null;
      // return newState;
    },
    [getTagsAsync.rejected?.type]: (state: TTagFilterSlice,
      { payload: error }: PayloadAction<Error>) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      error,
    }),
  },
});

export const tagsReducer = tagsFilterSlice.reducer;
export const { setCurrentTag, clearCurrentTag } = tagsFilterSlice.actions;
