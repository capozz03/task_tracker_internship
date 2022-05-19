import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';
import { isLoadingStatusCheck } from 'shared/helpers';

const getTaskForm = (state: TState) => state.taskForm;
const getDatesInfo = createSelector(getTaskForm, ({ dates }) => dates);

export const getDateStart = createSelector(getDatesInfo, ({ data }) => data?.start);
export const getDateStop = createSelector(getDatesInfo, ({ data }) => data?.stop);

export const isLoadingDatesStatus = createSelector(getDatesInfo, ({ status }) =>
  isLoadingStatusCheck(status),
);
