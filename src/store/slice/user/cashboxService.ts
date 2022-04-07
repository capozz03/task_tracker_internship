import { $api } from 'shared';
import { TAuthResponse, TUser } from './entities';

type TUserInfoResponse = {
  data: TUser;
};

export const userService = {
  generateToken: async (id: string) => $api.post<TAuthResponse>(
    '/ladum/token/generate',
    { user_id: id },
  ),

  getUserInfo: async (id: string) => $api.get<TUserInfoResponse>(`/ladum/users/${id}`),
};
