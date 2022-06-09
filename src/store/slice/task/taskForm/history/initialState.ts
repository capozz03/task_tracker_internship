import { RequestStatuses } from 'shared';
import { TState } from './entities';

export const initialState = {
  data: {
    pagination: {
      items_count: 0,
      items_total: 0,
      page_current: 0,
      page_total: 0,
      per_page: 20,
    },
    data: [],
  },
  error: null,
  status: RequestStatuses.IDLE,
} as TState;
