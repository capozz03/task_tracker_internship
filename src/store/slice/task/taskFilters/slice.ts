import { RequestStatuses } from 'shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTaskSearch, TTag } from '../entities';
import { assignedButtons } from 'features/Tasks/tasksComponents/FilterAssignedTo/constants';

export type TFiltersSlice = {
  assignedToFilterIndex: number;
  filters: TTaskSearch;
  isFiltersMenuShow: boolean;
  isFiltersResetButtonShow: boolean;
  status: RequestStatuses;
  error: Error | null;
};

export const exceptions = ['assigned_to_me', 'role_id_for_me'];

const initialState = {
  assignedToFilterIndex: 0,
  filters: {
    assigned_to_me: true,
    role_id_for_me: null,
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
    setFilterAssignedTo(state, { payload }: PayloadAction<number>) {
      state.assignedToFilterIndex = payload;
      state.filters.assigned_to_me = assignedButtons[payload].payload.assigned_to_me || null;
      state.filters.role_id_for_me = assignedButtons[payload].payload.role_id_for_me?.length
        ? assignedButtons[payload].payload.role_id_for_me
        : null;
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
        assigned_to_me: state.filters.assigned_to_me,
        role_id_for_me: state.filters.role_id_for_me,
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
