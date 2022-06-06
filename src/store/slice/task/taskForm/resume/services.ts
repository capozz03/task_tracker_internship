import { $apiTask, clientCookies } from 'shared';
import { TFormResult } from '../../entities';
import { TFormResultChangeResponse } from './entities';

export const formResultChangeService = async (taskId: string, formResult: TFormResult[]) =>
  $apiTask.post<TFormResultChangeResponse>(
    `/api/v1.0/task/tasks/${taskId}/form-result-change`,
    {
      form_result: formResult,
    },
    {
      headers: {
        Authorization: `Bearer ${clientCookies.getToken()}`,
      },
    },
  );
