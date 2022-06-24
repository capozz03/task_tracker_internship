import { $apiTask } from 'shared';
import {
  TTagsCreateRequest,
  TTagsCUDResponse, TTagsDeleteRequest,
  TTagsFilterSearchProps,
  TTagsResponse, TTagsUpdateRequest,
} from 'store/slice/task/tags/entities';

export const tagsFilterService = {
  getTags: ({ search, page, perPage }: TTagsFilterSearchProps) => $apiTask.get<TTagsResponse>('/api/v1.0/task/tags', {
    params: {
      search: search || null,
      page,
      per_page: perPage,
    },
  }),
  createTag: ({ titleTag, color }: TTagsCreateRequest) => $apiTask.post<TTagsCUDResponse>('/api/v1.0/task/tags', {
    name: titleTag,
    color,
  }),
  updateTag: ({ taskTagId, titleTag, color }: TTagsUpdateRequest) => $apiTask.post<TTagsCUDResponse>(`/api/v1.0/task/tags/${taskTagId}`, {
    name: titleTag,
    color,
  }),
  deleteTag: ({ taskTagId }: TTagsDeleteRequest) => $apiTask.delete<TTagsCUDResponse>(`/api/v1.0/task/tags/${taskTagId}`),
};
