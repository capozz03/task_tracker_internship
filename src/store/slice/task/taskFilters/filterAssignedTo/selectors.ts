import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';

const getFilterAssignedToSliceStore = (state: TState) => state.taskFilters;

export const getFilterAssignedTo = createSelector(
  getFilterAssignedToSliceStore,
  ({ assignedToMe }) => assignedToMe,
);
