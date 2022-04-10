import { $apiTask } from 'shared';
import { TTask, TTaskStatusChange } from '../entities';

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2NDkzNjU5NDh9.BlDy-a8wT1lRMB62NW2UKzgB14aOqwQEU5ImtNL1F_SUucHBFNJ2YwAp9_SZlQef1xJplk4d9e5gy0Pi5eqYjDMwPJeUv-EEqSCno_iYNnOwo4_GUIQe_yiin5vLzhfbd4jH9C0bu82F23K_cvSyylub0w5J0XWP0DAMV3YcMw-GC_z0dFGi1DQxH7PsL7APIDxRXOFWLKQi6xG53rimE-bWXw6VkHdzseeHNo5iP2djNVHUD-ungk3oW0du_UJ795ZRJfgLnhsQAwZzJFninRJ0VBG5kBMJITryM9UlUYERkOpZwBRXKKmcd7_CFOAOlEH8xKVbRYmEBRkCU0ylzbP6sYVz2_rSWwspoKR3WTB1lFUmnMiI-wnxrqcb0bdrvqMiI-hJelZrjGcQGgtlJdCvCqUGxfudaS1TA9_HsFbzsFQvdnHO4oWJmKAl4HKTptDwsiJ9rVPeGSpZ9jbn1s3ZyZJXMmJl1gY6YKW0xcEN9jKTaWKBK2qpUKC1UG_WV9TY1asNynqnnNcGd4TymyBZGSY9dUd2kUECOwWS0loaFTUu7sC6lSg4szGNUvLGgWOuF4mVMezKl4qQzwlRXM9O9V_reDe-h-oomWYjw9bi1JvuifgTi8C3QpxAl0yfjLz1SZun6fqMLUZBGI6aEle8QEiCbu6QmlQlpx_NNdQ';

export const taskService = {
  getTasks: async (params?: any) =>
    $apiTask.get<TTask[]>('/api/v1.0/task/tasks', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  changeStatusTask: async ({ task_id: taskId, task_status_id: taskStatusId }: TTaskStatusChange) =>
    $apiTask.post<TTask[]>(
      `/api/v1.0/task/tasks/${taskId}/status-change`,
      { task_status_id: taskStatusId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),
  duplicateTask: async (taskId: string) =>
    $apiTask.post<TTask[]>(
      `/api/v1.0/task/tasks/${taskId}/clone`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),
  deleteTask: async (taskId: string) =>
    $apiTask.delete<TTask[]>(`/api/v1.0/task/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
