import { PayloadAction } from '@reduxjs/toolkit';
import { TToggleReadStatusProps, TNotificationReducer } from './entities';
import { initialState } from './slice';

export default {
  nextPage(state: TNotificationReducer) {
    if (state.pagination.page_total > state.pagination.page_current) {
      state.pagination.page_current += 1;
    }
  },
  showNotification(state: TNotificationReducer) {
    state.isVisible = true;
  },
  hiddenNotification(state: TNotificationReducer) {
    state.isVisible = false;
    state.pagination.page_current = 1;
  },
  clearNotifications(state: TNotificationReducer) {
    state = initialState;
    return state;
  },
  toggleReadStatus(state: TNotificationReducer,
    { payload }: PayloadAction<TToggleReadStatusProps>) {
    state.notifications = state.notifications.map((notification) => {
      if (payload.listNotificationId.includes(notification.subscribe_notify_id)) {
        notification.viewed = payload.status === undefined
          ? !notification.viewed
          : payload.status;
        if (notification.viewed) {
          state.pagination.items_total -= 1;
        } else {
          state.pagination.items_total += 1;
        }
      }
      return notification;
    });
    return state;
  },
};
