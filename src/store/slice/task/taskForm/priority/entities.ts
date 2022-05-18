import { TTask } from 'store/slice/task/entities';
import { RequestStatuses } from 'shared';
import { Priority } from 'features/Tasks/tasksComponents/PriorityStatus/constants';

export type TPriorityStateData = {
  task_priority_id: string;
  name: keyof typeof Priority | null;
}

export type TState = {
  data: TPriorityStateData | null;
  status: RequestStatuses;
  error: Error | null;
}

export type TRequestChangePriorityProps = {
  taskId: string;
  taskPriorityId: string | null;
}

export type TResponseChangePriority = {
  data: TTask;
}
