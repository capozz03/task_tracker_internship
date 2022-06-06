import { RequestStatuses } from 'shared';
import { TTask } from 'store/slice/task/entities';

export type TRolesChangeProps = {
  userId: string | number | undefined;
  roleId: string;
  taskId: string | undefined;
  userName: string | undefined;
  roleName: string;
}

export type TRolesChangeResponse = {
  relation: any;
  data: TTask;
}

export type TRolesUnit = {
  userId: string | number;
  userName: string;
  logo: string | undefined;
  created?: string;
}

export type TStateData = {
  author: TRolesUnit | null;
  performers: TRolesUnit[];
  responsible: TRolesUnit[];
  observers: TRolesUnit[];
}

export type TState = {
  data: TStateData | null;
  status: RequestStatuses;
  error: Error | null;
}
