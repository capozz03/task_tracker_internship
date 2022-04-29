/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import styles from './index.module.scss';
import { Select } from 'antd';
import { PriorityStatus } from '../../../tasksComponents';
import { Priority } from '../../../tasksComponents/PriorityStatus/constants';

const { Option } = Select;

type PrioritySelectProps = {
  value?: keyof typeof Priority | null;
};

const PrioritySelect = ({ value = null }: PrioritySelectProps) => {
  const [priority, setPriority] = useState(value);

  const onChange = (val: any) => {
    setPriority(val);
  };

  return (
    <Select
      className={styles.select}
      bordered={false}
      showArrow={false}
      value={priority}
      onChange={onChange}
    >
      <Option className={styles.selectItem} value={null}>
        <PriorityStatus type={null} />
      </Option>
      <Option className={styles.selectItem} value="Высокий">
        <PriorityStatus type="Высокий" />
      </Option>
      <Option className={styles.selectItem} value="Средний">
        <PriorityStatus type="Средний" />
      </Option>
      <Option className={styles.selectItem} value="Низкий">
        <PriorityStatus type="Низкий" />
      </Option>
    </Select>
  );
};

export default PrioritySelect;
