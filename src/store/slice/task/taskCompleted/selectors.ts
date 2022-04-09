import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';

const getTaskCompletedSliceStore = (state: TState) => state.taskCompleted;

export const getPagination = createSelector(
  getTaskCompletedSliceStore, ({ pagination }) => pagination);
export const getTasks = createSelector(
  getTaskCompletedSliceStore, ({ tasks }) => tasks);
export const getStatus = createSelector(
  getTaskCompletedSliceStore, ({ status }) => status);
export const getError = createSelector(
  getTaskCompletedSliceStore, ({ error }) => error);
