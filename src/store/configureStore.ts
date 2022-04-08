import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { MainSlice, TaskInWorkSlice, UserSlice, CompletedTaskSlice, TaskInboxSlice } from './slice';

const rootReducer = combineReducers({
  main: MainSlice.mainReducer,
  user: UserSlice.userReducer,
  taskInWork: TaskInWorkSlice.taskInWorkReducer,
  completedTask: CompletedTaskSlice.completedTaskReducer,
  taskInbox: TaskInboxSlice.taskInboxReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type TState = ReturnType<typeof store.getState>;
