import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';

const getTaskFormSliceStore = (state: TState) => state.taskForm.task;

export const getDescription = createSelector(
  getTaskFormSliceStore,
  ({ task }) => task?.description,
);
export const getStatus = createSelector(getTaskFormSliceStore, ({ status }) => status);
export const getError = createSelector(getTaskFormSliceStore, ({ error }) => error);
