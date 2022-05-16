import React, { useState } from 'react';
import styles from './index.module.scss';
import { Select } from 'antd';
import { Priority } from 'features/Tasks/tasksComponents/PriorityStatus/constants';
import { PriorityStatus } from 'features/Tasks/tasksComponents';

const { Option } = Select;

type PrioritySelectProps = {
  value?: keyof typeof Priority | null;
  onPriorityChange: Function;
};

const PrioritySelect = ({ value = null, onPriorityChange }: PrioritySelectProps) => {
  const [priority, setPriority] = useState(value);

  const onChange = (newvalue: keyof typeof Priority | null) => {
    setPriority(newvalue);
    onPriorityChange(newvalue);
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
