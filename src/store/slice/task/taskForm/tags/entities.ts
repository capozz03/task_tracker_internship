import { RequestStatuses } from 'shared';
import { TTask, TTagsTask } from 'store/slice/task/entities';

export type TState = {
  data: TTagsTask[] | null;
  status: RequestStatuses;
  error: Error | null;
};

export type TRequestParams = {
  taskId: string;
  tagId: string;
};

export type TResponse = {
  data: TTask;
}
