import { $apiTask, clientCookies } from 'shared';
import { TTaskHistoryProps, TStateData } from './entities';

$apiTask.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${clientCookies.getToken()}`,
  },
}));

export const historyService = {
  getHistoryOnTask: async ({ taskId, page, limit }: TTaskHistoryProps) =>
    $apiTask.get<TStateData>(
      'api/v1.0/history/commands',
      {
        params: {
          relation_type: 'task',
          relation_id: taskId,
          per_page: limit,
          page,
        },
      },
    ),
};
