import React from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import styles from './index.module.scss';
import { assignedButtons } from './constants';
import { IconAll, IconMy } from './icons';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFilters, TaskInboxSlice, TaskInWorkSlice, TaskCompletedSlice } from 'store/slice';

const FilterAssigned = () => {
  const dispatch = useDispatch();
  const value = useSelector(TaskFilters.getFilterAssignedTo);
  const taskInbox = useSelector(TaskInboxSlice.getTasks);
  const taskInWork = useSelector(TaskInWorkSlice.getTasks);
  const taskCompleted = useSelector(TaskCompletedSlice.getTasks);
  let countTasks = 0;
  if (taskInbox?.length !== undefined
    && taskInWork?.length !== undefined
    && taskCompleted?.length !== undefined) {
    countTasks = taskInbox.length + taskInWork.length + taskCompleted.length;
  }
  const onChange = (e: RadioChangeEvent) => {
    dispatch(TaskFilters.setFilterAssignedTo(e.target.value));
  };

  return (
    <Radio.Group disabled={countTasks === 0 && value === assignedButtons[0].value} value={value} optionType="button" buttonStyle="outline" onChange={onChange}>
      <Radio.Button value={assignedButtons[0].value}>
        <span className={styles.wrapper}>
          <IconAll />
          <span className={styles.text}>{assignedButtons[0].label}</span>
        </span>
      </Radio.Button>
      <Radio.Button value={assignedButtons[1].value}>
        <span className={styles.wrapper}>
          <IconMy />
          <span className={styles.text}>{assignedButtons[1].label}</span>
        </span>
      </Radio.Button>
    </Radio.Group>
  );
};

export default FilterAssigned;
