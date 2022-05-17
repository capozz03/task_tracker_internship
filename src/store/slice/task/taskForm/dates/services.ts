import { $apiTask, clientCookies } from 'shared';
import { TRequestParams, TResponse } from './entities';

$apiTask.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${clientCookies.getToken()}`,
  },
}));

export const datesService = {
  changeTaskDateStart: async ({ taskId, datetimeISO }: TRequestParams) =>
    $apiTask.post<TResponse>(
      `api/v1.0/task/tasks/${taskId}/exec-start-change`,
      {
        exec_start: datetimeISO,
      },
    ),

  changeTaskDateStop: async ({ taskId, datetimeISO }: TRequestParams) =>
    $apiTask.post<TResponse>(
      `api/v1.0/task/tasks/${taskId}/exec-stop-change`,
      {
        exec_stop: datetimeISO,
      },
    ),
};
