import React from 'react';
import styles from './index.module.scss';
import { Select, Tooltip } from 'antd';
import { PriorityStatus } from '../../../tasksComponents';
import { Priority } from '../../PriorityStatus/constants';
import { useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { TaskPriorities } from 'shared';
import { TPriority } from 'store/slice/task/entities';

const { Option } = Select;

type PrioritySelectProps = {
  taskId: string;
  taskPriority: TPriority | null;
};

const PriorityChanger = ({ taskId, taskPriority }: PrioritySelectProps) => {
  const dispatch = useDispatch();

  const onClick = (e: any) => {
    e.stopPropagation();
  };

  const onChange = (value: keyof typeof Priority | null) => {
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

    dispatch(
      TaskFormSlice.changeTaskPriority({
        taskId,
        taskPriorityId: priorityId,
      }),
    );
  };

  return (
    <Tooltip title="Изменить приоритет">
      <Select
        className={styles.select}
        bordered={false}
        showArrow={false}
        defaultValue={taskPriority?.name || null}
        onChange={onChange}
        onClick={onClick}
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
