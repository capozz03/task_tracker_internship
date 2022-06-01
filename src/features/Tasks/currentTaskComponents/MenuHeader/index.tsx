import React from 'react';
import AttachMenu from './AttachMenu';
import Subscribes from './Subscribes';
import DropdownMenu from './DropdownMenu';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';

const MenuHeader = () => {
  const task = useSelector(TaskFormSlice.getTask);

  return (
    <div className={styles.wrap}>
      {task && <AttachMenu taskId={task.task_id} />}
      <Subscribes />
      {task && <DropdownMenu task={task} />}
    </div>
  );
};

export default MenuHeader;
