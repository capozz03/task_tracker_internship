import { $apiTask } from 'shared/api';
import { TTaskItemResponse } from 'store/slice/task/entities';
import { clientCookies } from 'shared';

export const getTaskById = async (taskId: string) =>
  $apiTask.get<TTaskItemResponse>(`/api/v1.0/task/tasks/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${clientCookies.getToken()}`,
      },
    });
