import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';
import { isLoadingStatusCheck } from 'shared/helpers';

const getTaskForm = (state: TState) => state.taskForm;

const getTaskInformation = createSelector(getTaskForm, ({ task }) => task);

export const getTask = createSelector(getTaskInformation, ({ task }) => task);
export const getTaskFormTitle = createSelector(getTaskInformation, ({ task }) => task?.title);
export const getTaskFormStatus = createSelector(getTaskInformation, ({ status }) => status);
export const getTaskFormError = createSelector(getTaskInformation, ({ error }) => error);
export const getTaskFormIsVisibleForm = createSelector(getTaskInformation,
  ({ isVisibleForm }) => isVisibleForm);
export const isLoadingStatus = createSelector(getTaskInformation, ({ status }) =>
  isLoadingStatusCheck(status),
);
