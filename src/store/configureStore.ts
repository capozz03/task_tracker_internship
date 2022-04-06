import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { MainSlice, TaskInWorkSlice } from './slice';

const rootReducer = combineReducers({
  main: MainSlice.mainReducer,
  taskInWork: TaskInWorkSlice.taskInWorkReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type TState = ReturnType<typeof store.getState>;
