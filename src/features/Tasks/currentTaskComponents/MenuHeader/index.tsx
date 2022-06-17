import React from 'react';
import AttachMenu from './AttachMenu';
import Subscribes from './Subscribes';
import DropdownMenu from './DropdownMenu';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { usePermissions } from 'shared/helpers';

const MenuHeader = () => {
  const task = useSelector(TaskFormSlice.getTask);
  const can = usePermissions(
    ['duplicate.task', 'duplicate/edit.task', 'delete.task', 'add/change/remove.checklist', 'add/remove.file'],
    task?.roles,
  );

  return (
    <div className={styles.wrap}>
      {
        task && (can['add/change/remove.checklist'] || can['add/remove.file'])
        && <AttachMenu taskId={task.task_id} />
      }
      <Subscribes />
      {
        task && (can['duplicate.task'] || can['duplicate/edit.task'] || can['delete.task'])
        && (
          <DropdownMenu task={task} />
        )
      }
    </div>
  );
};

export default MenuHeader;
