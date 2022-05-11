import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  MainSlice,
  TaskInWorkSlice,
  UserSlice,
  TaskCompletedSlice,
  TaskInboxSlice,
  TaskFormSlice,
  TaskFilters,
  TagsSlice,
  CommonSlice,
} from './slice';

const rootReducer = combineReducers({
  main: MainSlice.mainReducer,
  user: UserSlice.userReducer,
  taskInWork: TaskInWorkSlice.taskInWorkReducer,
  taskCompleted: TaskCompletedSlice.taskCompletedReducer,
  taskInbox: TaskInboxSlice.taskInboxReducer,
  taskForm: TaskFormSlice.taskFormReducer,
  taskFilters: TaskFilters.filtersReducer,
  tags: TagsSlice.tagsReducer,
  common: CommonSlice.commonReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type TState = ReturnType<typeof store.getState>;
