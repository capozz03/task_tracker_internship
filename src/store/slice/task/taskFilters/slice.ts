import { RequestStatuses } from 'shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTaskSearch, TTaskSearchAssignedToMe } from '../entities';

export type TFiltersSlice = {
  filters: TTaskSearch;
  status: RequestStatuses;
  error: Error | null;
};

const initialState = {
  filters: {
    assigned_to_me: null,
  },
  status: RequestStatuses.IDLE,
  error: null,
} as TFiltersSlice;

const filtersSlice = createSlice({
  name: 'taskFilters',
  initialState,
  reducers: {
    setFilterAssignedTo(state, { payload }: PayloadAction<TTaskSearchAssignedToMe>) {
      state.filters.assigned_to_me = payload;
      return state;
    },
  },
  extraReducers: {},
});

export const { setFilterAssignedTo } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
