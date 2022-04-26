/* eslint-disable no-unused-vars */
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import './index.module.scss';
import SearchIcon from './icon';
import { Input } from 'antd';
import { TaskFilters } from 'store/slice';

const KeywordInput = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    TaskFilters.setFilterKeyword(searchTerm);
  }, [searchTerm]);

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

export default KeywordInput;
