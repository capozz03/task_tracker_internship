import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';
import { isLoadingStatusCheck } from 'shared/helpers';

const getTaskForm = (state: TState) => state.taskForm;

export const getTask = createSelector(getTaskForm, ({ task }) => task.task);
export const getTaskFormTitle = createSelector(getTaskForm, ({ task }) => task.task?.title);
export const getTaskFormStatus = createSelector(getTaskForm, ({ task }) => task.status);
export const getTaskFormError = createSelector(getTaskForm, ({ task }) => task.error);
export const getTaskFormIsVisibleForm = createSelector(
  getTaskForm,
  ({ task }) => task.isVisibleForm,
);
export const isLoadingStatus = createSelector(getTaskForm, ({ task }) =>
  isLoadingStatusCheck(task.status),
);

export const isCreatedChecklist = createSelector(getTaskForm,
  ({ checkList }) => checkList.ui.isVisibleCreateChecklist);

export const isCreatedChecklistItem = createSelector(getTaskForm,
  ({ checkList }) => checkList.ui.isVisibleCreateItemChecklist);

export const getCheckLists = createSelector(getTaskForm, ({ task }) => task.task?.check_lists);
