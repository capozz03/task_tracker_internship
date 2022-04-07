import React from 'react';
import styles from './index.module.scss';
import { Input, InputProps } from 'antd';
import SearchIcon from './icon';

const SearchInput = (props: InputProps) => (
  <div className={styles.input}>
    <SearchIcon />
    <Input {...props} />
  </div>
);

export default SearchInput;
