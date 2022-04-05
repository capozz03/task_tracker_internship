import { $api } from 'shared';
import { TTask } from '../entities';

export const taskService = {
  getTasks: async (params?: any) => $api.get<TTask[]>('/api/v1.0/task/tasks', {
    params,
  }),
};
