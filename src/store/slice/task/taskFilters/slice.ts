import { RequestStatuses } from 'shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTaskSearch, TTaskSearchAssignedToMe, TTaskSearchKeyword } from '../entities';

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
  },
  extraReducers: {},
});

export const { setFilterAssignedTo, setIsFiltersMenuShow, setFilterKeyword } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
