import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPagination, TTag } from '../../entities';
import { getTagsForFilters } from './asyncAction';
import { RequestStatuses } from '../../../../../shared';

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
    [getTagsForFilters.pending?.type]: (state: TTagFilterSlice) => ({
      ...state,
      status: RequestStatuses.LOADING,
    }),
    [getTagsForFilters.fulfilled?.type]: (state: TTagFilterSlice,
      { payload: tags }: PayloadAction<TTag[]>) => {
      const newState: TTagFilterSlice = { ...state };
      newState.tags = { ...newState.tags, ...tags };
      newState.status = RequestStatuses.SUCCESS;
      newState.error = null;
      return newState;
    },
    [getTagsForFilters.rejected?.type]: (state: TTagFilterSlice,
      { payload: error }: PayloadAction<Error>) => ({
      ...state,
      status: RequestStatuses.LOADING,
      error,
    }),
  },
});

export const tagsFilterReducer = tagsFilterSlice.reducer;
// export const {} = tagsFilterSlice.actions;
