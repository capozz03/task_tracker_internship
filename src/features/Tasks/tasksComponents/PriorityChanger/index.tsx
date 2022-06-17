import React from 'react';
import { Select, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { TaskPriorities } from 'shared';
import { TaskFormSlice } from 'store/slice';
import { TPriority, TRoles } from 'store/slice/task/entities';
import PriorityStatus from '../PriorityStatus';
import styles from './index.module.scss';
import { usePermissions } from 'shared/helpers';

type TProps = {
  priority: TPriority | null;
  currentTaskId: string;
  tooltip?: string;
  roles: TRoles[],
};

const { Option } = Select;

const PriorityChanger = ({ priority, currentTaskId, tooltip, roles }: TProps) => {
  const dispatch = useDispatch();
  const can = usePermissions(
    ['change.priority'],
    roles,
  );

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
    <Tooltip title={can['change.priority'] ? (tooltip || '') : ''}>
      <Select
        className={styles.select}
        bordered={false}
        showArrow={false}
        value={priority?.name || null}
        onChange={priorityChangeHandler}
        onClick={stopPropagation}
        disabled={!can['change.priority']}
        getPopupContainer={() => document.querySelector('.ant-layout') as HTMLElement}
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
