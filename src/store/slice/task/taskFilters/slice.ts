import { RequestStatuses } from 'shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTaskSearch, TTag } from '../entities';

export type TFiltersSlice = {
  filters: TTaskSearch;
  isFiltersMenuShow: boolean;
  isFiltersResetButtonShow: boolean;
  status: RequestStatuses;
  error: Error | null;
};

const initialState = {
  filters: {
    assigned_to_me: null,
    search: null,
    assign_user_id: null,
    storage_files_gte: null,
    tag_id: null,
    progress_gte: null,
    priority_id: null,
  },
  isFiltersMenuShow: false,
  isFiltersResetButtonShow: false,
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
    setFilterAssignUserIDArray(state, { payload }: PayloadAction<string[]>) {
      state.filters.assign_user_id = payload.length ? payload : null;
    },
    setTags(state: TFiltersSlice, { payload: tags }: PayloadAction<TTag[]>) {
      state.filters.tag_id = tags.length ? tags.map((tag) => tag.task_tag_id) : null;
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
  setFilterAssignUserIDArray,
  setTags,
  setFilterAttachmentsGTE,
  setFilterProgressGTE,
  setFilterPriorityIDArray,
  resetFilters,
} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
