import React from 'react';
import { Select, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { TaskPriorities } from 'shared';
import { TaskFormSlice } from 'store/slice';
import { TPriority } from 'store/slice/task/entities';
import PriorityStatus from '../PriorityStatus';
import styles from './index.module.scss';

type TProps = {
  priority: TPriority | null;
  currentTaskId: string;
  tooltip?: string;
};

const { Option } = Select;

const PriorityChanger = ({ priority, currentTaskId, tooltip }: TProps) => {
  const dispatch = useDispatch();

  const priorityChanger = (taskId: string, value: string | null) => {
    let priorityId;

    switch (value) {
      case 'Низкий':
        priorityId = TaskPriorities.LOW;
        break;
      case 'Средний':
        priorityId = TaskPriorities.NORMAL;
        break;
      case 'Высокий':
        priorityId = TaskPriorities.HIGH;
        break;
      default:
        priorityId = null;
    }

    dispatch(TaskFormSlice.changeTaskPriority({
      taskId,
      taskPriorityId: priorityId,
    }));
  };

  const priorityChangeHandler = (newPriorityName: string | null) => {
    priorityChanger(currentTaskId || '', newPriorityName);
  };

  const stopPropagation = (e: React.MouseEvent<HTMLElement>) => e.stopPropagation();

  return (
    <Tooltip title={tooltip || ''}>
      <Select
        className={styles.select}
        bordered={false}
        showArrow={false}
        value={priority?.name || null}
        onChange={priorityChangeHandler}
        onClick={stopPropagation}
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
    </Tooltip>
  );
};

export default PriorityChanger;
