import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPagination, TTag } from 'store/slice/task/entities';
import { getTagsAsync } from './asyncAction';
import { RequestStatuses } from 'shared';
import { TTagsResponse } from 'store/slice/task/tags/entities';

type TTagFilterSlice = {
  tags: TTag[],
  pagination: TPagination,
  status: RequestStatuses,
  error: Error | null,
}

const initialState = {
  tags: [],
  pagination: {
    items_count: 4,
    items_total: 4,
    per_page: 50,
    page_current: 1,
    page_total: 1,
  },
  status: RequestStatuses.IDLE,
  error: null,
} as TTagFilterSlice;

const tagsFilterSlice = createSlice({
  name: 'tagsFilterSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [getTagsAsync.pending?.type]: (state: TTagFilterSlice) => ({
      ...state,
      status: RequestStatuses.LOADING,
    }),
    [getTagsAsync.fulfilled?.type]: (state: TTagFilterSlice,
      { payload: tags }: PayloadAction<TTagsResponse>) => {
      const newState: TTagFilterSlice = { ...state };
      // newState.tags = [...newState.tags, ...tags.data];
      newState.tags = [...tags.data];
      newState.status = RequestStatuses.SUCCESS;
      newState.error = null;
      return newState;
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
// export const {} = tagsFilterSlice.actions;
