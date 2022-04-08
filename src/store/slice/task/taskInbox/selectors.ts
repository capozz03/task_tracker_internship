import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';

const getTaskInboxSliceStore = (state: TState) => state.taskInbox;

export const getPagination = createSelector(
  getTaskInboxSliceStore, ({ pagination }) => pagination);
export const getTasks = createSelector(
  getTaskInboxSliceStore, ({ tasks }) => tasks);
export const getStatus = createSelector(
  getTaskInboxSliceStore, ({ status }) => status);
export const getError = createSelector(
  getTaskInboxSliceStore, ({ error }) => error);
