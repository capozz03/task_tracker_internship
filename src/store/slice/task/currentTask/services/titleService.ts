import { $apiTask } from 'shared/api';
import { TTasksResponse } from 'store/slice/task/entities';
import { clientCookies } from 'shared';

export const getPosts = async (taskId: string, title: string) => $apiTask.post<TTasksResponse[]>(`/api/v1.0/task/tasks/${taskId}/title-change`, {
  title,
}, {
  headers: {
    Authorization: `Bearer ${clientCookies.getToken()}`,
  },
});
