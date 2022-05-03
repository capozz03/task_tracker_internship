import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Slider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFilters } from 'store/slice';
import { useDebounce } from 'shared';

function formatter(value: any) {
  return `${value}%`;
}

const ProgressFilter = () => {
  const dispatch = useDispatch();
  const storeMinProgress = useSelector(TaskFilters.getFilterProgressGTE);
  const [minProgress, setMinProgress] = useState(storeMinProgress);
  const debouncedMinProgress = useDebounce(minProgress, 500);

  useEffect(() => {
    dispatch(TaskFilters.setFilterProgressGTE(debouncedMinProgress));
  }, [debouncedMinProgress]);

  useEffect(() => {
    setMinProgress(storeMinProgress);
  }, [storeMinProgress]);

  const onChange = (value: number) => {
    setMinProgress(value);
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
