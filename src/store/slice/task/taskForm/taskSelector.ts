import { TState } from '../../../configureStore';
import { createSelector } from '@reduxjs/toolkit';
import { isLoadingStatusCheck } from 'shared/helpers';

const getTaskForm = (state: TState) => state.taskForm;

export const getTask = createSelector(getTaskForm, ({ task }) => task);
export const getTaskFormTitle = createSelector(getTaskForm, ({ task }) => task?.title);
export const getTaskFormStartDate = createSelector(getTaskForm, ({ task }) => task?.exec_start);
export const getTaskFormEndDate = createSelector(getTaskForm, ({ task }) => task?.exec_stop);
export const getTaskFormPriorityName = createSelector(getTaskForm, ({ task }) => task?.priority?.name);
export const getTaskFormTags = createSelector(getTaskForm, ({ task }) => task?.tags);
export const getTaskFormStatus = createSelector(getTaskForm, ({ status }) => status);
export const getTaskFormError = createSelector(getTaskForm, ({ error }) => error);
export const getTaskFormIsVisibleForm = createSelector(
  getTaskForm,
  ({ isVisibleForm }) => isVisibleForm,
);
export const isLoadingStatus = createSelector(getTaskForm, ({ status }) =>
  isLoadingStatusCheck(status),
);
