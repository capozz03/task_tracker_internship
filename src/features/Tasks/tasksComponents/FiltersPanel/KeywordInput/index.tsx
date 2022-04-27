/* eslint-disable no-unused-vars */
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import './index.module.scss';
import SearchIcon from './icon';
import { Input } from 'antd';
import { TaskFilters } from 'store/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '../../../../../shared';

const SearchInput = () => {
  const dispatch = useDispatch();
  const storeSearchTerm = useSelector(TaskFilters.getFilterKeyword);
  const [searchTerm, setSearchTerm] = useState(storeSearchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(TaskFilters.setFilterKeyword(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => setSearchTerm(e.target.value);

  return (
    <Input
      allowClear
      maxLength={100}
      value={searchTerm}
      onChange={onChange}
      prefix={<SearchIcon />}
      placeholder="Поиск по названию и описанию"
    />
  );
};

export default SearchInput;
