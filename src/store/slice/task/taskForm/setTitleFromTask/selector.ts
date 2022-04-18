import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';

const getTaskFormSliceStore = (state: TState) => state.taskForm;

export const getTitle = createSelector(
  getTaskFormSliceStore, ({ task }) => task?.title);
export const getStatus = createSelector(
  getTaskFormSliceStore, ({ status }) => status);
export const getError = createSelector(
  getTaskFormSliceStore, ({ error }) => error);
