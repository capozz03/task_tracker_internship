import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Select, SelectProps, Tooltip } from 'antd';
import style from './index.module.scss';
import { taskStatuses } from './constants';

const TaskStatus = ({ ...props }: SelectProps) => {
  const [color, setColor] = useState<string>('#50B5FF');
  const { Option } = Select;

  const changeTaskStatus = (e: string) => {
    Object.values(taskStatuses).forEach(({ color, taskStatusId }) => {
      if (e === taskStatusId) {
        setColor(color);
      }
    });
  };
  const currentStatus = taskStatuses.find((el) => el.status === props.defaultValue)!.taskStatusId;
  useEffect(() => {
    changeTaskStatus(currentStatus);
  }, []);

  const onClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <Tooltip title="Изменить статус">
      <Select
        className={style.taskStatus}
        defaultValue={currentStatus}
        bordered={false}
        showArrow={false}
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ borderRadius: '8px' }}
        onSelect={changeTaskStatus}
        style={{ backgroundColor: `${color}` }}
        onChange={props.onChange}
        onClick={onClick}
      >
        {taskStatuses.map(({ status, taskStatusId }) => (
          <Option key={taskStatusId} value={taskStatusId} className={style.taskStatusItem} title="">
            {status}
          </Option>
        ))}
      </Select>
    </Tooltip>
  );
};

export default TaskStatus;
