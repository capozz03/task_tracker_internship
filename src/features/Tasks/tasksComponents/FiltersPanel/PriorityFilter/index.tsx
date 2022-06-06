import React from 'react';
import styles from './index.module.scss';
import { Checkbox, PriorityStatus } from 'features/Tasks/tasksComponents';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFilters } from 'store/slice';
import { isArrayOfStrings, TaskPriorities } from 'shared';
import { Checkbox as AntCheckbox } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

const PriorityFilter = () => {
  const dispatch = useDispatch();
  const initialValues = useSelector(TaskFilters.getFilterPriorityIDArray);

  const onChange = (values: CheckboxValueType[]) => {
    if (isArrayOfStrings(values)) {
      dispatch(TaskFilters.setFilterPriorityIDArray(values));
    }
  };

  return (
    <AntCheckbox.Group className={styles.wrapper} onChange={onChange} value={initialValues}>
      <Checkbox value={TaskPriorities.LOW}>
        <PriorityStatus type="Низкий" />
      </Checkbox>
      <Checkbox value={TaskPriorities.NORMAL}>
        <PriorityStatus type="Средний" />
      </Checkbox>
      <Checkbox value={TaskPriorities.HIGH}>
        <PriorityStatus type="Высокий" />
      </Checkbox>
    </AntCheckbox.Group>
  );
};

export default PriorityFilter;
