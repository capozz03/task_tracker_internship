import { TState } from '../../../../configureStore';
import { createSelector } from '@reduxjs/toolkit';

const getCurrentTaskSliceStore = (state: TState) => state.currentTask;

export const getTitle = createSelector(
  getCurrentTaskSliceStore, ({ task }) => task?.title);
