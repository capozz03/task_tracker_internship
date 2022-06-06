import { RequestStatuses } from 'shared';
import { TTask } from 'store/slice/task/entities';

export type TStateData = {
  start?: string | null | undefined;
  stop?: string | null | undefined;
};

export type TState = {
  data: TStateData | null;
  status: RequestStatuses;
  error: Error | null;
};

export type TRequestParams = {
  taskId: string;
  datetimeISO: string | null;
};

export type TResponse = {
  data: TTask;
}
