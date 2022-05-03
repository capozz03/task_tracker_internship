import { RequestStatuses } from 'shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TTaskSearch,
  TTaskSearchAssignedToMe,
  TTaskSearchAttachmentsGTE,
  TTaskSearchKeyword,
  TTaskSearchPriorityID,
  TTaskSearchProgressGTE,
} from '../entities';

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
    storage_files_gte: null,
    progress_gte: null,
    priority_id: null,
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
    setFilterAttachmentsGTE(state, { payload }: PayloadAction<TTaskSearchAttachmentsGTE>) {
      state.filters.storage_files_gte = payload || null;
    },
    setFilterProgressGTE(state, { payload }: PayloadAction<TTaskSearchProgressGTE>) {
      state.filters.progress_gte = payload || null;
    },
    setFilterPriorityIDArray(state, { payload }: PayloadAction<TTaskSearchPriorityID>) {
      state.filters.priority_id = payload.length ? payload : null;
    },
    resetFilters(state) {
      state.filters = {
        ...initialState.filters,
      };
    },
  },
  extraReducers: {},
});

export const {
  setFilterAssignedTo,
  setIsFiltersMenuShow,
  setFilterKeyword,
  setFilterAttachmentsGTE,
  setFilterProgressGTE,
  setFilterPriorityIDArray,
  resetFilters,
} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
