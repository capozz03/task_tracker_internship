import { $apiTask } from 'shared';
import { TCommand } from './entities';

export const historyServices = {
  getCommandListService: () => $apiTask.get<TCommand[]>('/api/v1.0/history/available-commands'),
};
