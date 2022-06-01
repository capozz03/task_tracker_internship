import React, { ChangeEventHandler, useEffect, useState } from 'react';
import './index.module.scss';
import SearchIcon from './icon';
import { Input } from 'antd';
import { TaskFilters } from 'store/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'shared';

const SearchInput = () => {
  const dispatch = useDispatch();
  const storeSearchTerm = useSelector(TaskFilters.getFilterKeyword);
  const [searchTerm, setSearchTerm] = useState(storeSearchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setSearchTerm(storeSearchTerm);
  }, [storeSearchTerm]);

  useEffect(() => {
    dispatch(TaskFilters.setFilterKeyword(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  return (
    <Input
      allowClear
      maxLength={100}
      value={searchTerm}
      onChange={onChange}
      prefix={<SearchIcon />}
      placeholder="По названию и описанию"
    />
  );
};

export default SearchInput;
