import { Progress } from 'antd';
import React, { MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { TaskFailedSlice } from 'store/slice';
import CardName from '../../CardName';
import DropdownMenu from '../../DropdownMenu';
import TagsGroup from '../../TagsGroup';
import TaskStatus from '../../TaskStatus';
import UserAssignedToTask from '../../UserAssignedToTask';
import style from './index.module.scss';
import { getTaskByIdAsync } from 'store/slice/task/taskForm';

type TaskFailedProps = {
  task: TaskFailedSlice.TTask;
};

const TaskFailed = ({ task }: TaskFailedProps) => {
  const dispatch = useDispatch();
  const progressPercent = task.progress?.percent || 0;
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
        <CardName
          name={task.title}
          attachments={task.storage_files_meta.total}
          checkListTotal={task.progress?.total || 0}
          checkListChecked={task.progress?.completed || 0}
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
        <DropdownMenu task={task} />
      </div>
    </div>
  );
};

export default TaskFailed;
