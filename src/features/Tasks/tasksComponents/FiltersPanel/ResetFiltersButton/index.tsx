import React, { MouseEventHandler } from 'react';
import styles from './index.module.scss';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { TaskFilters } from 'store/slice';

const ResetFiltersButton = () => {
  const dispatch = useDispatch();
  const onClick: MouseEventHandler<HTMLElement> = () => {
    dispatch(TaskFilters.resetFilters());
  };
  return (
    <Button type="default" block onClick={onClick}>
      <span className={styles.text}>Очистить фильтры</span>
    </Button>
  );
};

export default ResetFiltersButton;
