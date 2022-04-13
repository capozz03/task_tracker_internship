import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';

const getCurrentTaskSliceStore = (state: TState) => state.currentTask;

export const getTitle = createSelector(
  getCurrentTaskSliceStore, ({ task }) => task?.title);
export const getStatus = createSelector(
  getCurrentTaskSliceStore, ({ status }) => status);
export const getError = createSelector(
  getCurrentTaskSliceStore, ({ error }) => error);
