import { $apiTask, clientCookies } from 'shared';
import { TTask, TTaskItemResponse, TTaskStatusChange } from '../entities';

$apiTask.interceptors.request.use((config) => ({ ...config, headers: { ...config.headers, Authorization: `Bearer ${clientCookies.getToken()}` } }));

type duplicateTaskProps = {
  data: TTask,
  clone: TTask,
}

export const taskService = {
  getTasks: async (params?: any) => $apiTask.get<TTask[]>('/api/v1.0/task/tasks', {
    params,
  }),
  changeStatusTask: async ({
    task_id: taskId,
    task_status_id: taskStatusId }: TTaskStatusChange) =>
    $apiTask.post<TTaskItemResponse>(`/api/v1.0/task/tasks/${taskId}/status-change`,
      { task_status_id: taskStatusId },
    ),
  createNewTask: async ({
    task_status_id: taskStatusId,
    title,
  }: {
    task_status_id: string,
    title: string,
  }) =>
    $apiTask.post<TTask[]>('/api/v1.0/task/tasks',
      {
        task_status_id: taskStatusId,
        title,
      },
    ),
  duplicateTask: async (taskId: string) =>
    $apiTask.post<duplicateTaskProps>(`/api/v1.0/task/tasks/${taskId}/clone`, {}, {
      headers: {
        Authorization: `Bearer ${clientCookies.getToken()}`,
      },
    }),
  deleteTask: async (taskId: string) =>
    $apiTask.delete<TTask>(`/api/v1.0/task/tasks/${taskId}`),
};
