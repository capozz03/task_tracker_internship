import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';
import { isLoadingStatusCheck } from 'shared/helpers';

const getUsersSlice = (state: TState) => state.users;
export const usersListPagination = createSelector(getUsersSlice, (slice) => slice.data?.pagination);
export const usersList = createSelector(getUsersSlice, (slice) => slice.data?.data || []);
export const isLoadingStatus = createSelector(getUsersSlice, ({ status }) =>
  isLoadingStatusCheck(status),
);
