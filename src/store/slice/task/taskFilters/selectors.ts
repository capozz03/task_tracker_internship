/* eslint-disable camelcase */
import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';
import { isArray } from 'lodash';
import { exceptions } from './slice';

const getFiltersSliceStore = (state: TState) => state.taskFilters;

export const getFilters = createSelector(getFiltersSliceStore, ({ filters }) => filters);

// UI
export const getIsFiltersMenuShow = createSelector(
  getFiltersSliceStore,
  ({ isFiltersMenuShow }) => isFiltersMenuShow,
);
export const getIsFiltersResetButtonShow = createSelector(getFiltersSliceStore, ({ filters }) =>
  Object.entries(filters)
    .filter(([key]) => !exceptions.includes(key))
    .some(([, value]) => !!value),
);
export const getFiltersCount = createSelector(getFiltersSliceStore, ({ filters }) =>
  Object.entries(filters).reduce((prev: number, [key, value]) => {
    if (!exceptions.includes(key)) {
      if (isArray(value)) {
        return prev + value.length;
      }
      if (value) {
        return prev + 1;
      }
    }
    return prev;
  }, 0),
);

// Logic
export const getFilterAssignedTo = createSelector(
  getFilters,
  ({ assigned_to_me, role_id_for_me }) => ({
    assigned_to_me: !!assigned_to_me,
    role_id_for_me: role_id_for_me || [],
  }),
);
export const getFilterAssignedToIndex = createSelector(
  getFiltersSliceStore,
  ({ assignedToFilterIndex }) => assignedToFilterIndex,
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
