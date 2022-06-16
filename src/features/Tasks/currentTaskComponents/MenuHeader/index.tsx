import React, { useState, useEffect } from 'react';
import AttachMenu from './AttachMenu';
import Subscribes from './Subscribes';
import DropdownMenu from './DropdownMenu';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { checkPermission } from 'shared/helpers';

const MenuHeader = () => {
  const task = useSelector(TaskFormSlice.getTask);
  const [can, setCan] = useState({
    duplicate: checkPermission('duplicate.task', task?.roles),
    duplicateEdit: checkPermission('duplicate/edit.task', task?.roles),
    delete: checkPermission('delete.task', task?.roles),
    addChecklist: checkPermission('add/change/remove.checklist', task?.roles),
    addFile: checkPermission('add/remove.file', task?.roles),
  });

  useEffect(() => {
    setCan({
      duplicate: checkPermission('duplicate.task', task?.roles),
      duplicateEdit: checkPermission('duplicate/edit.task', task?.roles),
      delete: checkPermission('delete.task', task?.roles),
      addChecklist: checkPermission('add/change/remove.checklist', task?.roles),
      addFile: checkPermission('add/remove.file', task?.roles),
    });
  }, [task?.roles]);

  return (
    <div className={styles.wrap}>
      {
        task && (can.addChecklist || can.addFile)
        && <AttachMenu taskId={task.task_id} />
      }
      <Subscribes />
      {
        task && (can.duplicate || can.duplicateEdit || can.delete)
        && (
          <DropdownMenu task={task} />
        )
      }
    </div>
  );
};

export default MenuHeader;
