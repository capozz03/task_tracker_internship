import { Progress } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { CompletedTaskSlice } from 'store/slice';
import CardName from '../../CardName';
import DropdownMenu from '../../DropdownMenu';
import TagsGroup from '../../TagsGroup';
import TaskStatus from '../../TaskStatus';
import UserAssignedToTask from '../../UserAssignedToTask';
import style from './index.module.scss';
import { progress, progressBarPercent } from './progressBar';

type CardCompletedProps = {
  task: CompletedTaskSlice.TTask;
};

const CardCompleted = ({ task }: CardCompletedProps) => {
  const dispatch = useDispatch();
  const { total, checked } = progress;
  const progressPercent = progressBarPercent(progress);
  const statusHandler = (value: string) => {
    dispatch(
      CompletedTaskSlice.changeStatusTaskAsync({
        task_id: task.task_id,
        task_status_id: value,
      }),
    );
  };
  return (
    <div className={style.cardCompletedTask}>
      <div className={style.main}>
        <CardName
          name={task.title}
          attachments={task.storage_files_meta.total}
          checkListChecked={checked}
          checkListTotal={total}
        />
        <TaskStatus defaultValue={task.status.name} onChange={statusHandler} />
        <TagsGroup tags={task.tags} />
        <div className={style.progress}>
          <Progress percent={progressPercent} size="small" strokeColor="#3DD598" />
        </div>
        <UserAssignedToTask users={task.roles} />
      </div>
      <div className={style.dropdown}>
        <DropdownMenu />
      </div>
    </div>
  );
};

export default CardCompleted;
