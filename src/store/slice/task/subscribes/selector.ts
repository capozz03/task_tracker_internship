import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';

const getSubscribesSliceStore = (state: TState) => state.subscribes;

export const getPaginationSelector = createSelector(getSubscribesSliceStore,
  ({ pagination }) => pagination);
export const getSubscribesSelector = createSelector(getSubscribesSliceStore,
  ({ subscribes }) => subscribes);

export const checkSubscribe = createSelector(getSubscribesSliceStore,
  ({ subscribes }) => subscribes.length !== 0);
