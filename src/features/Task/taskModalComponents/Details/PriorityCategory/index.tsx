import React, { useCallback } from 'react';
import DetailCategory from 'features/Task/taskModalComponents/DetailCategory';
import PrioritySelect from './PrioritySelect';
import { TPriorityStateData } from 'store/slice/task/taskForm/priority/entities';
import { useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { TaskPriorities } from 'shared';

type TProps = {
  priority: TPriorityStateData | null;
  currentTaskId: string | undefined;
};

const PriorityCategory = ({ priority, currentTaskId }: TProps) => {
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

  const priorityChangeHandler = useCallback((newPriorityName: string | null) => (
    priorityChanger(currentTaskId || '', newPriorityName)
  ), [currentTaskId, priority]);

  return (
    <DetailCategory name="Приоритет" type="details">
      <PrioritySelect value={priority?.name || null} onPriorityChange={priorityChangeHandler} />
    </DetailCategory>
  );
};

export default PriorityCategory;
