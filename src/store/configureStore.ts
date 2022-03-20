import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { MainSlice } from './slice';

const rootReducer = combineReducers({
  main: MainSlice.mainReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type TState = ReturnType<typeof store.getState>;
