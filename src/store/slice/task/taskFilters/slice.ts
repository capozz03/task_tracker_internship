import { RequestStatuses } from 'shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTag, TTaskSearch, TTaskSearchAssignedToMe, TTaskSearchKeyword } from '../entities';

export type TFiltersSlice = {
  filters: TTaskSearch;
  isFiltersMenuShow: boolean;
  status: RequestStatuses;
  error: Error | null;
};

const initialState = {
  filters: {
    assigned_to_me: null,
    search: null,
  },
  isFiltersMenuShow: false,
  status: RequestStatuses.IDLE,
  error: null,
} as TFiltersSlice;

const filtersSlice = createSlice({
  name: 'taskFilters',
  initialState,
  reducers: {
    setIsFiltersMenuShow(state, { payload }: PayloadAction<boolean>) {
      state.isFiltersMenuShow = payload;
    },
    setFilterAssignedTo(state, { payload }: PayloadAction<TTaskSearchAssignedToMe>) {
      state.filters.assigned_to_me = payload ? true : null;
    },
    setFilterKeyword(state, { payload }: PayloadAction<TTaskSearchKeyword>) {
      state.filters.search = payload || null;
    },
    setTags(state: TFiltersSlice, { payload: tags }: PayloadAction<TTag[]>) {
      state.filters.tag_id = tags.map((tag) => tag.task_tag_id);
    },
  },
  extraReducers: {},
});

export const {
  setFilterAssignedTo,
  setIsFiltersMenuShow,
  setFilterKeyword,
  setTags } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
