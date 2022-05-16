import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';
import { isLoadingStatusCheck } from 'shared/helpers';

const getTaskForm = (state: TState) => state.taskForm;
const getRolesInfo = createSelector(getTaskForm, ({ roles }) => roles);

export const getRoles = createSelector(getRolesInfo, ({ data }) => data);

export const isLoadingRolesStatus = createSelector(getRolesInfo, ({ status }) =>
  isLoadingStatusCheck(status),
);
