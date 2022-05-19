import { $apiTask, clientCookies } from 'shared';
import { TRequestChangePriorityProps, TResponseChangePriority } from './entities';

$apiTask.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${clientCookies.getToken()}`,
  },
}));

export const priorityService = {
  changeTaskPriority: async ({ taskId, taskPriorityId }: TRequestChangePriorityProps) =>
    $apiTask.post<TResponseChangePriority>(
      `api/v1.0/task/tasks/${taskId}/priority-change`,
      {
        task_priority_id: taskPriorityId,
      },
    ),
};
