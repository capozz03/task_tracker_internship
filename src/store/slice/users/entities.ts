import { RequestStatuses } from 'shared';
import { TUser } from '../user/entities';

export type TUsersStateData = {
  pagination: {
    items_count: number;
    items_total: number;
    per_page: number;
    page_current: number;
    page_total: number;
  };
  data: TUser[];
};

export type TUsersState = {
  data: TUsersStateData | null;
  status: RequestStatuses;
  error: Error | null;
};
