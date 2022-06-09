import { $apiTask } from 'shared/api';
import { TTaskItemResponse } from 'store/slice/task/entities';
import { clientCookies } from 'shared';

export const setDescription = async (taskId: string, description: string) =>
  $apiTask.post<TTaskItemResponse>(
    `/api/v1.0/task/tasks/${taskId}/description-change`,
    {
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${clientCookies.getToken()}`,
      },
    },
  );
