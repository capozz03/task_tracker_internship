import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';

const getCompletedTaskSliceStore = (state: TState) => state.completedTask;

export const getPagination = createSelector(
  getCompletedTaskSliceStore, ({ pagination }) => pagination);
export const getTasks = createSelector(
  getCompletedTaskSliceStore, ({ tasks }) => tasks);
export const getStatus = createSelector(
  getCompletedTaskSliceStore, ({ status }) => status);
export const getError = createSelector(
  getCompletedTaskSliceStore, ({ error }) => error);
