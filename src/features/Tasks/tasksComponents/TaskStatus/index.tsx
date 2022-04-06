import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import style from './index.module.scss';
import { taskStatuses } from './constants';

type TaskStatusProps = {
  defaultValue: string
}

export const TaskStatus = ({ defaultValue }: TaskStatusProps) => {
  const [color, setColor] = useState<string>('#50B5FF');
  const { Option } = Select;

  const changeTaskStatus = (e: string) => {
    Object.values(taskStatuses).forEach(({ status, color }) => {
      if (e === status) {
        setColor(color);
      }
    });
  };

  useEffect(() => {
    changeTaskStatus(defaultValue);
  }, []);

  return (
    <Select
      className={style.taskStatus}
      defaultValue={defaultValue}
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
