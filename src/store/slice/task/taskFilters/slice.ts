import { RequestStatuses } from 'shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TTaskSearch,
  TTaskSearchAssignedToMe,
  TTaskSearchAttachmentsGTE,
  TTaskSearchKeyword,
  TTaskSearchPriorityID,
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
    storage_files_gte: 0,
    priority_id: undefined,
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
    setFilterPriorityIDArray(state, { payload }: PayloadAction<TTaskSearchPriorityID>) {
      state.filters.priority_id = payload.length ? payload : null;
    },
  },
  extraReducers: {},
});

export const {
  setFilterAssignedTo,
  setIsFiltersMenuShow,
  setFilterKeyword,
  setFilterAttachmentsGTE,
  setFilterPriorityIDArray,
} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
