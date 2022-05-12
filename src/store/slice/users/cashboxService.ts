import { $api } from 'shared';
import { TUsersStateData } from './entities';

export const userService = {
  getUsers: async (page: number, limit: number, search: string) => $api.get<TUsersStateData>(
    '/ladum/users',
    { params: { page, per_page: limit, search: search || null } },
  ),
};
