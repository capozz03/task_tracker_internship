import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';

const getTaskInWorkSliceStore = (state: TState) => state.taskInWork;

export const getPagination = createSelector(
  getTaskInWorkSliceStore, ({ pagination }) => pagination);
export const getTasks = createSelector(
  getTaskInWorkSliceStore, ({ tasks }) => tasks);
export const getStatus = createSelector(
  getTaskInWorkSliceStore, ({ status }) => status);
export const getError = createSelector(
  getTaskInWorkSliceStore, ({ error }) => error);
