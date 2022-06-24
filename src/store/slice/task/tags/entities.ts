import { TPagination, TTag } from 'store/slice/task/entities';

export type TTagsFilterSearchProps = {
  search: string;
  page: number;
  perPage: number;
}

export type TTagsResponse = {
  pagination: TPagination;
  data: TTag[];
};

export type TTagsCUDResponse = {
  data: {
    task_tag_id: string;
    name: string;
    color: string;
    created: string;
    updated: string;
  }
}

export type TTagsCreateRequest = {
  titleTag: string;
  color: string;
}

export type TTagsUpdateRequest = {
  taskTagId: string;
  titleTag: string;
  color: string;
}

export type TTagsDeleteRequest = {
  taskTagId: string;
}
