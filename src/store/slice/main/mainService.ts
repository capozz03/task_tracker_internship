import { $api } from 'shared';
import { TPosts } from './entities';

export const mainService = {
  getPosts: async () => $api.get<TPosts[]>('/posts'),
};
