import React, { useState } from 'react';
import { Select } from 'antd';
import style from './index.module.scss';

export const TaskStatus = () => {
  const [color, setColor] = useState<string>('#50B5FF');
  const { Option } = Select;

  const tasks: { status: string; color: string }[] = [
    {
      status: 'Создана',
      color: '#50B5FF',
    },
    {
      status: 'В работе',
      color: '#3DD598',
    },
    {
      status: 'Выполнена',
      color: '#A461D8',
    },
    {
      status: 'Не выполнена',
      color: '#FC5A5A',
    },
  ];

  const changeTaskStatus = (e: string) => {
    Object.values(tasks).forEach((task) => {
      if (e === task.status) {
        setColor(task.color);
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
      {tasks.map((task) => (
        <Option key={task.status} value={task.status} className={style.taskStatusItem}>
          {task.status}
        </Option>
      ))}
    </Select>
  );
};
