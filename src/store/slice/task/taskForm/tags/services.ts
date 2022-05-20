import { $apiTask, clientCookies } from 'shared';
import { TRequestParams, TResponse } from './entities';

$apiTask.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${clientCookies.getToken()}`,
  },
}));

export const tagsService = {
  addTagToTask: async ({ taskId, tagId }: TRequestParams) =>
    $apiTask.post<TResponse>(
      `api/v1.0/task/tasks/${taskId}/tag-assign`,
      {
        task_tag_id: tagId,
      },
    ),

  removeTagToTask: async ({ taskId, tagId }: TRequestParams) =>
    $apiTask.post<TResponse>(
      `api/v1.0/task/tasks/${taskId}/tag-unassign`,
      {
        task_tag_id: tagId,
      },
    ),
};
