import { $apiTask } from 'shared';
import { TTagsFilterSearchProps } from './entities';

export const tagsFilterService = {
  getTags: ({ search, page, perPage }: TTagsFilterSearchProps) => $apiTask.get('/api/v1.0/task/tags', {
    params: {
      search,
      page,
      per_page: perPage,
    },
  }),
};
