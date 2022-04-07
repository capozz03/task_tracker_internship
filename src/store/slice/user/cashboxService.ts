import { $api } from 'shared';
import { TAuthResponse } from './entities';

export const userService = {
  generateToken: async (id: string) => $api.post<TAuthResponse>(
    '/ladum/token/generate',
    { user_id: id },
  ),
};
