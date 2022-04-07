import { clientCookies } from 'shared';
import { TUserState } from './entities';

export const userSliceActions = {
  logoutUser(state: TUserState) {
    clientCookies.deleteToken();
    return { ...state, token: null };
  },
};
