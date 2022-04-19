import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';
import { isLoadingStatusCheck } from 'shared/helpers';

const getTaskForm = (state: TState) => state.taskForm;

export const getTask = createSelector(getTaskForm, ({ Data }) => Data.task);
export const getTaskFormTitle = createSelector(getTaskForm, ({ Data }) => Data.task?.title);
export const getTaskFormStatus = createSelector(getTaskForm, ({ Data }) => Data.status);
export const getTaskFormError = createSelector(getTaskForm, ({ Data }) => Data.error);
export const getTaskFormIsVisibleForm = createSelector(
  getTaskForm,
  ({ Data }) => Data.isVisibleForm,
);
export const isLoadingStatus = createSelector(getTaskForm, ({ Data }) =>
  isLoadingStatusCheck(Data.status),
);

export const isCreatedChecklist = createSelector(getTaskForm,
  ({ Checklist }) => Checklist.ui.isVisibleCreateChecklist);

export const isCreatedChecklistItem = createSelector(getTaskForm,
  ({ Checklist }) => Checklist.ui.isVisibleCreateItemChecklist);

export const getCheckLists = createSelector(getTaskForm, ({ Data }) => Data.task?.check_lists);
