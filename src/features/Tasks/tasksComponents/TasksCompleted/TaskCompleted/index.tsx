import { Progress } from 'antd';
import React, { MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { TaskCompletedSlice } from 'store/slice';
import CardName from '../../CardName';
import DropdownMenu from '../../DropdownMenu';
import TagsGroup from '../../TagsGroup';
import TaskStatus from '../../TaskStatus';
import UserAssignedToTask from '../../UserAssignedToTask';
import style from './index.module.scss';
import { progress, progressBarPercent } from './progressBar';
import { getTaskByIdAsync } from '../../../../../store/slice/task/taskForm';

type TaskCompletedProps = {
  task: TaskCompletedSlice.TTask;
};

const TaskCompleted = ({ task }: TaskCompletedProps) => {
  const dispatch = useDispatch();
  const { total, checked } = progress;
  const progressPercent = progressBarPercent(progress);
  const statusHandler = (value: string) => {
    dispatch(
      TaskCompletedSlice.changeStatusTaskAsync({
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
        <CardName
          name={task.title}
          attachments={task.storage_files_meta.total}
          checkListTotal={total}
          checkListChecked={checked}
        />
      </div>
      <div className={style.cardStatus}>
        <TaskStatus defaultValue={task.status.name} onChange={statusHandler} />
      </div>
      <div className={style.cardTagsGroupt}>
        <TagsGroup tags={task.tags} />
      </div>
      <div className={style.cardProgress}>
        <Progress percent={progressPercent} size="small" strokeColor="#3DD598" />
      </div>
      <div className={style.cardUsers}>
        <UserAssignedToTask users={task.roles} />
      </div>
      <div className={style.cardMenu}>
        <DropdownMenu taskId={task.task_id} taskStatusId={task.status.task_status_id} />
      </div>
    </div>
  );
};

export default TaskCompleted;
