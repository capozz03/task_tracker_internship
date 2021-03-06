import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Slider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFilters } from 'store/slice';
import { useDebounce } from 'shared';

const ProgressFilter = () => {
  const dispatch = useDispatch();
  const storeMinProgress = useSelector(TaskFilters.getFilterProgressGTE);
  const [minProgress, setMinProgress] = useState(storeMinProgress);
  const debouncedMinProgress = useDebounce(minProgress, 500);

  const onChange = (value: number) => {
    setMinProgress(value);
  };

  useEffect(() => {
    dispatch(TaskFilters.setFilterProgressGTE(debouncedMinProgress));
  }, [debouncedMinProgress]);

  useEffect(() => {
    setMinProgress(storeMinProgress);
  }, [storeMinProgress]);

  return (
    <div>
      <Slider
        className={styles.slider}
        min={0}
        max={100}
        step={10}
        value={minProgress}
        onChange={onChange}
        tooltipVisible={false}
      />
      <span className={styles.title}>
        {minProgress}
        %
        {minProgress < 100 && '+'}
      </span>
    </div>
  );
};

export default ProgressFilter;
