/* eslint-disable camelcase */
import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';

const getFiltersSliceStore = (state: TState) => state.taskFilters;

export const getFilters = createSelector(getFiltersSliceStore, ({ filters }) => filters);

export const getFilterAssignedTo = createSelector(
  getFilters,
  ({ assigned_to_me }) => assigned_to_me,
);
