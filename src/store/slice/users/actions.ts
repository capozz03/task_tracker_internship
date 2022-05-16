import { initialState } from './initialState';

export const usersSliceActions = {
  resetUserList() {
    return { ...initialState };
  },
};
