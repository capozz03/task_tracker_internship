import React from 'react';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { TTask } from 'store/slice/task/entities';
import { changeStatusTaskAsync } from 'store/slice/task/taskInbox/asyncActions';
import CardName from '../../CardName';
import { TaskStatus } from '../../TaskStatus';
import DateWithIconClock from '../../DateWithIconClock';
import TagsGroup from '../../TagsGroup';
import PriorityStatus from '../../PriorityStatus';
import UserAssignedToTask from '../../UserAssignedToTask';
import { DropdownMenu } from 'features/Tasks/tasksComponents/DropdownMenu';

type TaskInboxProps = {
  task: TTask;
};

const TaskInbox = ({ task }: TaskInboxProps) => {
  const dispatch = useDispatch();
  const statusHandler = (value: string) => {
    dispatch(
      changeStatusTaskAsync({
        task_id: task.task_id,
        task_status_id: value,
      }),
    );
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.cardName}>
        <CardName
          name={task.title}
          attachments={task.storage_files_meta.total}
          checkListTotal={2}
          checkListChecked={2}
        />
      </div>
      <div className={styles.cardStatus}>
        <TaskStatus defaultValue={task.status.name} onChange={statusHandler} />
      </div>
      <div className={styles.cardDate}>
        <DateWithIconClock date={task.created} />
      </div>
      {task.priority && <PriorityStatus type={task.priority.name} />}
      <div className={styles.cardTagsGroupt}>
        <TagsGroup tags={task.tags} />
      </div>
      <div className={styles.cardUsers}>
        <UserAssignedToTask users={task.roles} />
      </div>
      <div className={styles.cardMenu}>
        <DropdownMenu />
      </div>
    </div>
  );
};

export default TaskInbox;
