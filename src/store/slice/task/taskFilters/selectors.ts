/* eslint-disable camelcase */
import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';

const getFiltersSliceStore = (state: TState) => state.taskFilters;

export const getFilters = createSelector(getFiltersSliceStore, ({ filters }) => filters);

// UI
export const getIsFiltersMenuShow = createSelector(
  getFiltersSliceStore,
  ({ isFiltersMenuShow }) => isFiltersMenuShow,
);

// Logic
export const getFilterAssignedTo = createSelector(
  getFilters,
  ({ assigned_to_me }) => !!assigned_to_me,
);
export const getFilterKeyword = createSelector(
  getFilters,
  ({ search }) => search || '',
);
