import { clientCookies } from 'shared';
import { TUserState } from './entities';

export const userSliceActions = {
  logoutUser(state: TUserState) {
    clientCookies.deleteToken();
    clientCookies.deleteUserId();
    return { ...state, token: null, userInfo: null };
  },
};
