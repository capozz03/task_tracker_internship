import React from 'react';
import styles from './index.module.scss';
import { Button } from 'antd';

const ResetFiltersButton = () => (
  <Button type="default" block>
    <span className={styles.text}>Очистить фильтры</span>
  </Button>
);

export default ResetFiltersButton;
