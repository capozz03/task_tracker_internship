import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';
import { isLoadingStatusCheck } from 'shared/helpers';

const getNotificationSliceStore = (state: TState) => state.notifications;

export const getPaginationSelector = createSelector(getNotificationSliceStore,
  ({ pagination }) => pagination);
export const getNotificationsSelector = createSelector(getNotificationSliceStore,
  ({ notifications }) => notifications);
export const isVisible = createSelector(getNotificationSliceStore,
  ({ isVisible }) => isVisible);

export const isLoading = createSelector(getNotificationSliceStore,
  ({ status }) => isLoadingStatusCheck(status));
