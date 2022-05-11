import { TPagination, TTag } from 'store/slice/task/entities';

export type TTagsFilterSearchProps = {
  search: string;
  page: number;
  perPage: number;
}

export type TTagsResponse = {
  pagination: TPagination,
  data: TTag[],
};
