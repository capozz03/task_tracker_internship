import { $apiTask } from 'shared/api';
import { TTask } from 'store/slice/task/entities';
import { clientCookies } from 'shared';

export const getFullInformationTask = async (taskId: string) => $apiTask.get<TTask[]>(`/api/v1.0/task/tasks/${taskId}`, {
  headers: {
    Authorization: `Bearer ${clientCookies.getToken()}`,
  },
});
