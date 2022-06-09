import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';
import { isLoadingStatusCheck } from 'shared/helpers';

const getTaskForm = (state: TState) => state.taskForm;
const getTaskHistoryInfo = createSelector(getTaskForm, ({ history }) => history);

export const getHistoryPagination = createSelector(
  getTaskHistoryInfo, ({ data }) => data?.pagination);
export const getHistory = createSelector(getTaskHistoryInfo, ({ data }) => data?.data);

export const isLoadingHistory = createSelector(getTaskHistoryInfo, ({ status }) =>
  isLoadingStatusCheck(status),
);
