import { Progress } from 'antd';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TaskFailedSlice } from 'store/slice';
import DropdownMenu from '../../DropdownMenu';
import TagsGroup from '../../TagsGroup';
import TaskStatus from '../../TaskStatus';
import UserAssignedToTask from '../../UserAssignedToTask';
import style from './index.module.scss';
import { getTaskByIdAsync } from 'store/slice/task/taskForm';
import CardNameText from '../../CardNameText';
import CardAttachmentsCount from '../../CardAttachmentsCount';
import CardChecklistCount from '../../CardChecklistCount';
import { checkPermission } from 'shared/helpers';

type TaskFailedProps = {
  task: TaskFailedSlice.TTask;
};

const TaskFailed = ({ task }: TaskFailedProps) => {
  const dispatch = useDispatch();
  const [can, setCan] = useState({
    change: checkPermission('change.status', task.roles),
  });

  useEffect(() => {
    setCan({
      change: checkPermission('change.status', task.roles),
    });
  }, [task.roles]);

  const statusHandler = (value: string) => {
    dispatch(
      TaskFailedSlice.changeStatusTaskAsync({
        task_id: task.task_id,
        task_status_id: value,
      }),
    );
  };
  const openTask: MouseEventHandler<HTMLElement> = () => {
    dispatch(getTaskByIdAsync(task.task_id));
  };
  return (
    <div className={style.wrap} role="button" onClick={openTask} onKeyDown={() => {}} tabIndex={-1}>
      <div className={style.cardName}>
        <CardNameText text={task.title} />
      </div>
      <div className={style.cardFilesAndCheckbox}>
        {task.storage_files_meta.total !== 0 && (
          <CardAttachmentsCount count={task.storage_files_meta.total} />
        )}
        {task.progress && task.progress.total !== 0 && (
          <CardChecklistCount
            checkListTotal={task.progress.total}
            checkListChecked={task.progress.completed}
          />
        )}
      </div>

      <div className={style.cardStatus}>
        <TaskStatus
          defaultValue={task.status.name}
          onChange={statusHandler}
          tooltip={can.change ? 'Изменить статус' : ''}
          isDisabled={!can.change}
        />
      </div>
      <div className={style.cardTagsGroup}>
        <TagsGroup tags={task.tags} taskId={task.task_id} roles={task.roles} />
      </div>
      <div className={style.cardProgress}>
        {task.progress && <Progress percent={task.progress.percent} size="small" strokeColor="#3DD598" />}
      </div>
      <div className={style.cardUsers}>
        <UserAssignedToTask users={task.roles} />
      </div>
      <div className={style.cardMenu}>
        <DropdownMenu task={task} />
      </div>
    </div>
  );
};

export default TaskFailed;
