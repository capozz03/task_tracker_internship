import { $apiTask, clientCookies } from 'shared';
import { TTask, TTaskStatusChange } from '../entities';

export const taskService = {
  getTasks: async (params?: any) =>
    $apiTask.get<TTask[]>('/api/v1.0/task/tasks', {
      params,
      headers: {
        Authorization: `Bearer ${clientCookies.getToken()}`,
      },
    }),
  changeStatusTask: async ({ task_id: taskId, task_status_id: taskStatusId }: TTaskStatusChange) =>
    $apiTask.post<TTask[]>(
      `/api/v1.0/task/tasks/${taskId}/status-change`,
      { task_status_id: taskStatusId },
      {
        headers: {
          Authorization: `Bearer ${clientCookies.getToken()}`,
        },
      },
    ),
  duplicateTask: async (taskId: string) =>
    $apiTask.post<TTask[]>(
      `/api/v1.0/task/tasks/${taskId}/clone`,
      {},
      {
        headers: {
          Authorization: `Bearer ${clientCookies.getToken()}`,
        },
      },
    ),
  deleteTask: async (taskId: string) =>
    $apiTask.delete<TTask[]>(`/api/v1.0/task/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${clientCookies.getToken()}`,
      },
    }),
};
