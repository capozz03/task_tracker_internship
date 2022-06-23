import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SettingsSlice } from 'store/slice';
import { TSortType, TPagination } from 'store/slice/task/entities';
import { TListName } from 'store/slice/task/settings';

type TSettingsHookParams = {
  listName: TListName,
  sort: TSortType | undefined,
  pagination: TPagination | null | undefined,
  setters: {
    setPagination: any,
    setSort: any,
  }
};

export const useSettings = ({
  listName, sort, pagination, setters,
}: TSettingsHookParams) => {
  const dispatch = useDispatch();
  const { setPagination, setSort } = setters;
  const savedPagination = useSelector(SettingsSlice.getPagination);
  const savedSort = useSelector(SettingsSlice.getSort);
  const [isSettigsApplied, setIsSettigsApplied] = useState(false);

  useEffect(() => {
    if (savedPagination[listName]) {
      dispatch(setPagination(savedPagination[listName]));
    }
    if (savedSort[listName]) {
      dispatch(setSort(savedSort[listName]));
    }
    setIsSettigsApplied(true);
  }, []);

  useEffect(() => {
    dispatch(SettingsSlice.setSort({ listName, sort }));
  }, [sort]);

  useEffect(() => {
    dispatch(SettingsSlice.setPagination({ listName, pagination }));
  }, [pagination]);

  return isSettigsApplied;
};
