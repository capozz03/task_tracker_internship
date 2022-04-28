import React from 'react';
import styles from './index.module.scss';
import { Checkbox, PriorityStatus } from 'features/Tasks/tasksComponents';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFilters } from 'store/slice';
import { TaskPriorities } from 'shared';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const PriorityFilter = () => {
  const dispatch = useDispatch();
  const prioritiesChecked = useSelector(TaskFilters.getFilterPriorityIDArray);

  const onChange = (e: CheckboxChangeEvent) => {
    if (prioritiesChecked.includes(e.target.value)) {
      dispatch(
        TaskFilters.setFilterPriorityIDArray(
          prioritiesChecked.filter((val) => val !== e.target.value),
        ),
      );
    } else {
      dispatch(TaskFilters.setFilterPriorityIDArray([...prioritiesChecked, e.target.value]));
    }
  };

  return (
    <div className={styles.wrapper}>
      <Checkbox value={TaskPriorities.LOW} onChange={onChange}>
        <PriorityStatus type="Низкий" />
      </Checkbox>
      <Checkbox value={TaskPriorities.NORMAL} onChange={onChange}>
        <PriorityStatus type="Средний" />
      </Checkbox>
      <Checkbox value={TaskPriorities.HIGH} onChange={onChange}>
        <PriorityStatus type="Высокий" />
      </Checkbox>
    </div>
  );
};

export default PriorityFilter;
