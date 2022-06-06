import { $apiTask } from 'shared/api';
import { TTaskItemResponse } from 'store/slice/task/entities';
import { clientCookies } from 'shared';

export const setTitle = async (taskId: string, title: string) => $apiTask.post<TTaskItemResponse>(`/api/v1.0/task/tasks/${taskId}/title-change`, {
  title,
}, {
  headers: {
    Authorization: `Bearer ${clientCookies.getToken()}`,
  },
});
