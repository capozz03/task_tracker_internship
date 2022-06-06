import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  MainSlice,
  TaskInWorkSlice,
  UserSlice,
  UsersSlice,
  TaskCompletedSlice,
  TaskInboxSlice,
  TaskFailedSlice,
  TaskFormSlice,
  TaskFilters,
  TagsSlice,
  CommonSlice,
  HistorySlice,
  NotificationsSlice,
  SubscribesSlice,
} from './slice';

const rootReducer = combineReducers({
  main: MainSlice.mainReducer,
  user: UserSlice.userReducer,
  users: UsersSlice.usersReducer,
  taskInWork: TaskInWorkSlice.taskInWorkReducer,
  taskCompleted: TaskCompletedSlice.taskCompletedReducer,
  taskFailed: TaskFailedSlice.taskFailedReducer,
  taskInbox: TaskInboxSlice.taskInboxReducer,
  taskForm: TaskFormSlice.taskFormReducer,
  taskFilters: TaskFilters.filtersReducer,
  tags: TagsSlice.tagsReducer,
  common: CommonSlice.commonReducer,
  history: HistorySlice.historyReducer,
  notifications: NotificationsSlice.notificationReducer,
  subscribes: SubscribesSlice.subscribeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type TState = ReturnType<typeof store.getState>;
