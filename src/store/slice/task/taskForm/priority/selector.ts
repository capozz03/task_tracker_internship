import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';
import { isLoadingStatusCheck } from 'shared/helpers';

const getTaskForm = (state: TState) => state.taskForm;
const getPriorityInfo = createSelector(getTaskForm, ({ priority }) => priority);

export const getPriority = createSelector(getPriorityInfo, ({ data }) => data);

export const isLoadingPriorityStatus = createSelector(getPriorityInfo, ({ status }) =>
  isLoadingStatusCheck(status),
);
