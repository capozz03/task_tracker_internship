import { TState } from '../../../../configureStore';
import { createSelector } from '@reduxjs/toolkit';

const getCurrentTaskSliceStore = (state: TState) => state.currentTask;

export const getFullInformation = createSelector(
  getCurrentTaskSliceStore, ({ task }) => task);
