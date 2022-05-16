import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';

const getNotificationSliceStore = (state: TState) => state.notifications;

export const getPaginationSelector = createSelector(getNotificationSliceStore,
  ({ pagination }) => pagination);
export const getNotificationsSelector = createSelector(getNotificationSliceStore,
  ({ notifications }) => notifications);
