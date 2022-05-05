import { RequestStatuses } from 'shared';

export type TUsersStateData = {
  pagination: {
    items_count: number;
    items_total: number;
    per_page: number;
    page_current: number;
    page_total: number;
  },
  data: Array<
    {
      user_id: string,
      name: string,
      logo: string;
      permissions: Array<string>
    }
  >
};

export type TUsersState = {
  data: TUsersStateData | null;
  status: RequestStatuses;
  error: Error | null;
};
