import React from 'react';
import styles from './index.module.scss';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFilters } from 'store/slice';

const ResetFiltersButton = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector(TaskFilters.getIsFiltersResetButtonShow);
  const onClick = () => {
    dispatch(TaskFilters.resetFilters());
  };
  return (
    <Button type="default" block onClick={onClick} hidden={!isVisible} className={styles.resetFilters}>
      <span className={styles.text}>Очистить фильтры</span>
    </Button>
  );
};

export default ResetFiltersButton;
