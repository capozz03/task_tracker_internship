import React, { useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import styles from './index.module.scss';
import { assignedButtons, TFilterAssignedTo } from './constants';
import { IconAll, IconMy } from './icons';

type FilterAssignedProps = {
  currentValue: keyof typeof TFilterAssignedTo;
};

const FilterAssigned = ({ currentValue }: FilterAssignedProps) => {
  const [value, setValue] = useState<keyof typeof TFilterAssignedTo>(currentValue);

  const onChange = (e: RadioChangeEvent) => setValue(e.target.value);

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
