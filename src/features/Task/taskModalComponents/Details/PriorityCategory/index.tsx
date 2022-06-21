import React from 'react';
import { useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { TaskPriorities } from 'shared';
import { Select } from 'antd';
import DetailCategory from 'features/Task/taskModalComponents/Details/DetailCategory';
import { TPriorityStateData } from 'store/slice/task/taskForm/priority/entities';
import { PriorityStatus } from 'features/Tasks/tasksComponents';
import styles from './index.module.scss';

type TProps = {
  priority: TPriorityStateData | null;
  currentTaskId: string | undefined;
  hiddenCategory: ()=>void;
  isDisabled?: boolean;
};

const { Option } = Select;

const PriorityCategory = ({
  priority,
  currentTaskId,
  hiddenCategory,
  isDisabled = false,
}: TProps) => {
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
    if (!newPriorityName) hiddenCategory();
  };

  return (
    <DetailCategory name="Приоритет" type="details">
      <Select
        getPopupContainer={() => document.querySelector('.ant-modal-wrap') as HTMLElement}
        className={styles.select}
        bordered={false}
        showArrow={false}
        value={priority?.name || null}
        onChange={priorityChangeHandler}
        disabled={isDisabled}
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
    </DetailCategory>
  );
};

export default PriorityCategory;
