/* eslint-disable no-unused-vars */
import { TPagination, TSortType } from 'store/slice/task/entities';

export type TListName = 'inbox' | 'inWork' | 'completed' | 'failed';

export type TSettingsState = {
  pagination: {
    [Property in TListName]?: TPagination | null;
  },
  sort: {
    [Property in TListName]?: TSortType;
  },
  filters: {
    assignToFilterIndex?: number;
  }
};

export type TActionSetPagination = {
  listName: TListName,
  pagination: TPagination | null | undefined;
};

export type TActionSetSort = {
  listName: TListName,
  sort: TSortType | undefined;
};

export type TActionSetFiltersAssignTo = {
  filterIndex: number;
};
