import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';

const getUserSlice = (state: TState) => state.user;
export const userToken = createSelector(getUserSlice, (slice) => slice.token);
export const userId = createSelector(getUserSlice, (slice) => slice.userId);
export const userInfo = createSelector(getUserSlice, (slice) => slice.userInfo);
