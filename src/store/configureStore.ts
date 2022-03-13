import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { mainReducer } from './slice';

const rootReducer = combineReducers({
  main: mainReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});
