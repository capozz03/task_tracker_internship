import React, { useState } from 'react';
import { Select } from 'antd';
import style from './index.module.scss';
import { taskStatuses } from './constants';

export const TaskStatus = () => {
  const [color, setColor] = useState<string>('#50B5FF');
  const { Option } = Select;

  const changeTaskStatus = (e: string) => {
    Object.values(taskStatuses).forEach(({ status, color }) => {
      if (e === status) {
        setColor(color);
      }
    });
  };

  return (
    <Select
      className={style.taskStatus}
      defaultValue="Создана"
      bordered={false}
      showArrow={false}
      dropdownMatchSelectWidth={false}
      dropdownStyle={{ borderRadius: '8px' }}
      onSelect={changeTaskStatus}
      style={{ backgroundColor: `${color}` }}
    >
      {taskStatuses.map(({ status }) => (
        <Option
          key={status}
          value={status}
          className={style.taskStatusItem}
        >
          {status}
        </Option>
      ))}
    </Select>
  );
};
