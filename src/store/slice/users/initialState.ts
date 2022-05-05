import { RequestStatuses } from 'shared';
import { TUsersState } from './entities';

export const initialState = {
  data: {
    pagination: {
      items_count: 0,
      items_total: 0,
      page_current: 1,
      page_total: 0,
      per_page: 20,
    },
    data: [],
  },
  status: RequestStatuses.IDLE,
  error: null,
} as TUsersState;
