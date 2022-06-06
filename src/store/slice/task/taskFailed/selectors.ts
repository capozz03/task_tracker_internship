import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';
import { isLoadingStatusCheck } from 'shared/helpers';

const getTaskFailedSliceStore = (state: TState) => state.taskFailed;

export const getPagination = createSelector(
  getTaskFailedSliceStore,
  ({ pagination }) => pagination,
);
export const getTasks = createSelector(getTaskFailedSliceStore, ({ tasks }) => tasks);
export const getStatus = createSelector(getTaskFailedSliceStore, ({ status }) => status);
export const getError = createSelector(getTaskFailedSliceStore, ({ error }) => error);
export const isLoadingStatus = createSelector(getTaskFailedSliceStore, ({ status }) =>
  isLoadingStatusCheck(status),
);

export const getSortTasksFailed = createSelector(getTaskFailedSliceStore, ({ sort }) => sort);
