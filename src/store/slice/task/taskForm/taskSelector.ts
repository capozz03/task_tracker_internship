import { TState } from '../../../configureStore';
import { createSelector } from '@reduxjs/toolkit';

const getTaskForm = (state: TState) => state.taskForm;

export const getTask = createSelector(getTaskForm, ({ task }) => task);
export const getTaskFormTitle = createSelector(getTaskForm, ({ task }) => task?.title);
export const getTaskFormStatus = createSelector(getTaskForm, ({ status }) => status);
export const getTaskFormError = createSelector(getTaskForm, ({ error }) => error);
export const getTaskFormIsVisibleForm = createSelector(getTaskForm,
  ({ isVisibleForm }) => isVisibleForm);
