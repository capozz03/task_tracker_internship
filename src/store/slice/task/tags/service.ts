import { $apiTask } from 'shared';
import { TTagsFilterSearchProps, TTagsResponse } from 'store/slice/task/tags/entities';

export const tagsFilterService = {
  getTags: ({ search, page, perPage }: TTagsFilterSearchProps) => $apiTask.get<TTagsResponse>('/api/v1.0/task/tags', {
    params: {
      search: search || null,
      page,
      per_page: perPage,
    },
  }),
};
