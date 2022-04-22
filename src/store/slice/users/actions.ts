// import { TUsersState } from './entities';
import { RequestStatuses } from 'shared';

export const usersSliceActions = {
  resetUserList() {
    return { data: null, status: RequestStatuses.IDLE, error: null };
  },
};
