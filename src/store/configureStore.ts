import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  MainSlice,
  TaskInWorkSlice,
  UserSlice,
  UsersSlice,
  TaskCompletedSlice,
  TaskInboxSlice,
  TaskFormSlice,
} from './slice';

const rootReducer = combineReducers({
  main: MainSlice.mainReducer,
  user: UserSlice.userReducer,
  users: UsersSlice.usersReducer,
  taskInWork: TaskInWorkSlice.taskInWorkReducer,
  taskCompleted: TaskCompletedSlice.taskCompletedReducer,
  taskInbox: TaskInboxSlice.taskInboxReducer,
  taskForm: TaskFormSlice.taskFormReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type TState = ReturnType<typeof store.getState>;
