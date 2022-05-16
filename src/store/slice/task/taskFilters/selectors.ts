/* eslint-disable camelcase */
import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';
import { isArray } from 'lodash';

const getFiltersSliceStore = (state: TState) => state.taskFilters;

export const getFilters = createSelector(getFiltersSliceStore, ({ filters }) => filters);

// UI
export const getIsFiltersMenuShow = createSelector(
  getFiltersSliceStore,
  ({ isFiltersMenuShow }) => isFiltersMenuShow,
);
export const getIsFiltersResetButtonShow = createSelector(getFiltersSliceStore, ({ filters }) =>
  Object.values(filters).some((value) => !!value),
);
export const getFiltersCount = createSelector(getFiltersSliceStore, ({ filters }) =>
  Object.values(filters).reduce((prev: number, current) => {
    if (isArray(current)) {
      return prev + current.length;
    }
    if (current) {
      return prev + 1;
    }
    return prev;
  }, 0),
);

// Logic
export const getFilterAssignedTo = createSelector(
  getFilters,
  ({ assigned_to_me }) => !!assigned_to_me,
);
export const getFilterKeyword = createSelector(getFilters, ({ search }) => search || '');
export const getFilterAssignUserIDArray = createSelector(
  getFilters,
  ({ assign_user_id }) => assign_user_id,
);
export const getFilterAttachmentsGTE = createSelector(
  getFilters,
  ({ storage_files_gte }) => storage_files_gte,
);
export const getFilterProgressGTE = createSelector(
  getFilters,
  ({ progress_gte }) => progress_gte || 0,
);
export const getFilterPriorityIDArray = createSelector(
  getFilters,
  ({ priority_id }) => priority_id || [],
);
export const getTags = createSelector(getFilters, ({ tag_id }) => tag_id || []);
