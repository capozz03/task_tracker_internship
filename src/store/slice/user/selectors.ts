import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';

const getUserSlice = (state: TState) => state.user;
export const getUserToken = createSelector(getUserSlice, (slice) => slice.token);
