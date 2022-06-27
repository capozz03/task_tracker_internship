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
  SettingsSlice,
} from './slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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
  settings: SettingsSlice.settingsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type TState = ReturnType<typeof store.getState>;
