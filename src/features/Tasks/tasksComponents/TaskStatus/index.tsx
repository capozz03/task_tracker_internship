import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Select, SelectProps } from 'antd';
import style from './index.module.scss';
import { taskStatuses } from './constants';

const TaskStatus = ({ ...props }: SelectProps) => {
  const [color, setColor] = useState<string>('#50B5FF');
  const [statusId, setStatusId] = useState(props.defaultValue);
  const { Option } = Select;

  const changeTaskStatus = (e: string) => {
    Object.values(taskStatuses).forEach(({ color, taskStatusId }) => {
      if (e === taskStatusId) {
        setColor(color);
        setStatusId(taskStatusId);
      }
    });
  };
  const currentStatus = taskStatuses.find((el) => el.status === props.defaultValue)!.taskStatusId;

  useEffect(() => {
    changeTaskStatus(currentStatus);
  }, [props.defaultValue]);

  const onClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
  };

  const onMouseEnter: MouseEventHandler<HTMLElement> = () => {
    Object.values(taskStatuses).forEach(({ hoverColor, taskStatusId }) => {
      if (statusId === taskStatusId) {
        setColor(hoverColor);
      }
    });
  };

  const onMouseLeave: MouseEventHandler<HTMLElement> = () => {
    Object.values(taskStatuses).forEach(({ color, taskStatusId }) => {
      if (statusId === taskStatusId) {
        setColor(color);
      }
    });
  };

  return (
    <Select
      className={style.taskStatus}
      defaultValue={currentStatus}
      value={currentStatus}
      bordered={false}
      showArrow={false}
      dropdownMatchSelectWidth={false}
      dropdownStyle={{ borderRadius: '8px' }}
      onSelect={changeTaskStatus}
      style={{ backgroundColor: `${color}` }}
      onChange={props.onChange}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {taskStatuses.map(({ status, taskStatusId }) => (
        <Option key={taskStatusId} value={taskStatusId} className={style.taskStatusItem}>
          {status}
        </Option>
      ))}
    </Select>
  );
};

export default TaskStatus;
