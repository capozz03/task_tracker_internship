import { $apiTask, clientCookies } from 'shared';
import { TRolesChangeProps, TRolesChangeResponse } from './entities';

$apiTask.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${clientCookies.getToken()}`,
  },
}));

export const rolesService = {
  addUserRole: async ({ userId, roleId, taskId }: TRolesChangeProps) =>
    $apiTask.post<TRolesChangeResponse>(
      `api/v1.0/task/tasks/${taskId}/role-assign`,
      {
        assign_user_id: userId,
        task_role_id: roleId,
      },
    ),

  removeUserRole: async ({ userId, roleId, taskId }: TRolesChangeProps) =>
    $apiTask.post<TRolesChangeResponse>(
      `api/v1.0/task/tasks/${taskId}/role-unassign`,
      {
        assign_user_id: userId,
        task_role_id: roleId,
      },
    ),
};
