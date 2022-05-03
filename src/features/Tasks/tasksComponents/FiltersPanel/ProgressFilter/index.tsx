import React from 'react';
import styles from './index.module.scss';
import { Slider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFilters } from 'store/slice';

function formatter(value: any) {
  return `${value}%`;
}

const ProgressFilter = () => {
  const dispatch = useDispatch();
  const minProgress = useSelector<any, any>(TaskFilters.getFilterProgressGTE);
  const onChange = (value: any) => {
    dispatch(TaskFilters.setFilterProgressGTE(value));
  };

  return (
    <Slider
      className={styles.slider}
      min={0}
      max={100}
      step={10}
      value={minProgress}
      onChange={onChange}
      tipFormatter={formatter}
    />
  );
};

export default ProgressFilter;
