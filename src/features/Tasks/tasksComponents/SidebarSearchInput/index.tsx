import React from 'react';
import styles from './index.module.scss';
import { Input } from 'antd';
import SearchIcon from './icon';

const SearchInput = () => (
  <div className={styles.input}>
    <SearchIcon />
    <Input placeholder="Поиск" />
  </div>
);

export default SearchInput;
