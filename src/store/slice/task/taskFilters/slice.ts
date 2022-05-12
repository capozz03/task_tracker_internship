import { RequestStatuses } from 'shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTaskSearch, TTag } from '../entities';

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
    tag_id: null,
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
    setFilterAssignedTo(state, { payload }: PayloadAction<boolean>) {
      state.filters.assigned_to_me = payload || null;
    },
    setFilterKeyword(state, { payload }: PayloadAction<string>) {
      state.filters.search = payload || null;
    },
    setTags(state: TFiltersSlice, { payload: tags }: PayloadAction<TTag[]>) {
      state.filters.tag_id = tags.map((tag) => tag.task_tag_id);
    },
    setFilterAttachmentsGTE(state, { payload }: PayloadAction<number>) {
      state.filters.storage_files_gte = payload || null;
    },
    setFilterProgressGTE(state, { payload }: PayloadAction<number>) {
      state.filters.progress_gte = payload || null;
    },
    setFilterPriorityIDArray(state, { payload }: PayloadAction<string[]>) {
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
  setTags,
  setFilterAttachmentsGTE,
  setFilterProgressGTE,
  setFilterPriorityIDArray,
  resetFilters,
} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
