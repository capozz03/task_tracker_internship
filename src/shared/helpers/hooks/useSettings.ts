import { ActionCreatorWithOptionalPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SettingsSlice } from 'store/slice';
import { TSortType, TPagination } from 'store/slice/task/entities';
import { TListName } from 'store/slice/task/settings';

type TSettingsHookParams = {
  sort?: {
    listName: TListName,
    value: TSortType | undefined,
    setter: ActionCreatorWithOptionalPayload<TSortType | undefined, string>,
  },
  pagination?: {
    listName: TListName,
    value: TPagination | null | undefined,
    setter: ActionCreatorWithPayload<TPagination | null, string>,
  },
  filterAssignTo?: {
    value: number,
    setter: ActionCreatorWithPayload<number, string>,
  }
};

export const useSettings = ({
  sort, pagination, filterAssignTo,
}: TSettingsHookParams) => {
  const dispatch = useDispatch();
  const savedPagination = useSelector(SettingsSlice.getPagination);
  const savedSort = useSelector(SettingsSlice.getSort);
  const savedFilterAssingTo = useSelector(SettingsSlice.getFiltersAssignTo);

  const [isSettigsApplied, setIsSettigsApplied] = useState(false);

  useEffect(() => {
    if (pagination && savedPagination[pagination.listName]) {
      dispatch(pagination.setter(savedPagination[pagination.listName] || null));
    }

    if (sort && savedSort[sort.listName]) {
      dispatch(sort.setter(savedSort[sort.listName]));
    }

    if (filterAssignTo && savedFilterAssingTo) {
      dispatch(filterAssignTo.setter(savedFilterAssingTo));
    }

    setIsSettigsApplied(true);
  }, []);

  useEffect(() => {
    if (sort) {
      dispatch(SettingsSlice.setSort({
        listName: sort.listName,
        sort: sort.value,
      }));
    }
  }, [sort]);

  useEffect(() => {
    if (pagination) {
      dispatch(SettingsSlice.setPagination({
        listName: pagination.listName,
        pagination: pagination.value,
      }));
    }
  }, [pagination]);

  useEffect(() => {
    if (filterAssignTo) {
      dispatch(SettingsSlice.setFilterAssignTo({
        filterIndex: filterAssignTo.value,
      }));
    }
  }, [filterAssignTo]);

  return isSettigsApplied;
};
