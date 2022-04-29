import React from 'react';
import styles from './index.module.scss';
import { Switch } from 'antd';
import { useDispatch } from 'react-redux';
import { TaskFilters } from 'store/slice';

const AttachmentsFilter = () => {
  const dispatch = useDispatch();
  const onChange = (checked: boolean) => {
    dispatch(TaskFilters.setFilterAttachmentsGTE(checked ? 1 : null));
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.text}>С вложениями</span>
      <Switch size="small" onChange={onChange} />
    </div>
  );
};

export default AttachmentsFilter;
