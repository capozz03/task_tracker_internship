import React, { useEffect, useState } from 'react';
import { Select, SelectProps } from 'antd';
import style from './index.module.scss';
import { taskStatuses } from './constants';

export const TaskStatus = ({ ...props }: SelectProps) => {
  const [color, setColor] = useState<string>('#50B5FF');
  const { Option } = Select;

  const changeTaskStatus = (e: string) => {
    Object.values(taskStatuses).forEach(({ color, taskStatusId }) => {
      if (e === taskStatusId) {
        setColor(color);
      }
    });
  };

  useEffect(() => {
    changeTaskStatus(taskStatuses.find((el) => el.status === props.defaultValue)!.taskStatusId);
  }, []);

  return (
    <Select
      className={style.taskStatus}
      defaultValue={taskStatuses.find((el) => el.status === props.defaultValue)!.taskStatusId}
      bordered={false}
      showArrow={false}
      dropdownMatchSelectWidth={false}
      dropdownStyle={{ borderRadius: '8px' }}
      onSelect={changeTaskStatus}
      style={{ backgroundColor: `${color}` }}
      onChange={props.onChange}
    >
      {taskStatuses.map(({ status, taskStatusId }) => (
        <Option
          key={taskStatusId}
          value={taskStatusId}
          className={style.taskStatusItem}
        >
          {status}
        </Option>
      ))}
    </Select>
  );
};
