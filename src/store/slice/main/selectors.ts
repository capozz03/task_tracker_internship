import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';

const getMainSliceStore = (state: TState) => state.main;

export const getTodoList = createSelector(getMainSliceStore, ({ todo }) => todo);
