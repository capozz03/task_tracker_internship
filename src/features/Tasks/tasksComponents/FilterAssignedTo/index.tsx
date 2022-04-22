import React from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import styles from './index.module.scss';
import { assignedButtons } from './constants';
import { IconAll, IconMy } from './icons';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions } from 'store/slice';

const FilterAssigned = () => {
  const dispatch = useDispatch();
  const value = useSelector(CommonActions.getFilterAssignedTo);

  const onChange = (e: RadioChangeEvent) => {
    dispatch(CommonActions.setFilterAssignedTo(e.target.value));
  };

  return (
    <Radio.Group value={value} optionType="button" buttonStyle="outline" onChange={onChange}>
      <Radio.Button value={assignedButtons[0].value}>
        <span className={styles.wrapper}>
          <IconAll />
          <span className={styles.text}>{assignedButtons[0].label}</span>
        </span>
      </Radio.Button>
      <Radio.Button value={assignedButtons[1].value}>
        <span className={styles.wrapper}>
          <IconMy />
          <span className={styles.text}>{assignedButtons[1].label}</span>
        </span>
      </Radio.Button>
    </Radio.Group>
  );
};

export default FilterAssigned;
