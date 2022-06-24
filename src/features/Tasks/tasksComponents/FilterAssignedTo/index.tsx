import React from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import styles from './index.module.scss';
import { assignedButtons } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  TaskFilters,
  TaskInboxSlice,
  TaskInWorkSlice,
  TaskCompletedSlice,
  TaskFailedSlice,
} from 'store/slice';
import Tooltip from '../Tooltip';
import { useSettings } from 'shared';

const FilterAssigned = () => {
  const dispatch = useDispatch();
  const value = useSelector(TaskFilters.getFilterAssignedToIndex);
  const taskInbox = useSelector(TaskInboxSlice.getTasks);
  const taskInWork = useSelector(TaskInWorkSlice.getTasks);
  const taskCompleted = useSelector(TaskCompletedSlice.getTasks);
  const taskFailed = useSelector(TaskFailedSlice.getTasks);

  useSettings({
    filterAssignTo: {
      value,
      setter: TaskFilters.setFilterAssignedTo,
    },
  });

  let countTasks = 0;
  if (
    taskInbox?.length !== undefined
    && taskInWork?.length !== undefined
    && taskCompleted?.length !== undefined
    && taskFailed?.length !== undefined
  ) {
    countTasks = taskInbox.length + taskInWork.length + taskCompleted.length + taskFailed.length;
  }

  const onChange = (e: RadioChangeEvent) => {
    dispatch(TaskFilters.setFilterAssignedTo(e.target.value));
  };

  return (
    <Radio.Group
      disabled={countTasks === 0 && value === 0}
      value={value}
      optionType="button"
      buttonStyle="outline"
      onChange={onChange}
    >
      {assignedButtons.map((options, index) => (
        <Tooltip title={options.tooltip} key={options.label}>
          <Radio.Button value={index}>
            <span className={styles.wrapper}>
              {options.icon}
              <span className={styles.text}>{options.label}</span>
            </span>
          </Radio.Button>
        </Tooltip>
      ))}
    </Radio.Group>
  );
};

export default FilterAssigned;
