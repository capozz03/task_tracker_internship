import React from 'react';
import { TTask } from 'store/slice/task/entities';
import CardName from 'features/Tasks/tasksComponents/CardName';
import DateWithIconClock from 'features/Tasks/tasksComponents/DateWithIconClock';
import PriorityStatus from 'features/Tasks/tasksComponents/PriorityStatus';
import TagsGroup from 'features/Tasks/tasksComponents/TagsGroup';
import UserAssignedToTask from 'features/Tasks/tasksComponents/UserAssignedToTask';
import styles from './index.module.scss';
import { DropdownMenu } from 'features/Tasks/tasksComponents/DropdownMenu';
import { TaskStatus } from '../../TaskStatus';

type TaskInWokrProps = {
  task: TTask
}

const TaskInWokr = ({ task }: TaskInWokrProps) => (
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
      <TaskStatus defaultValue={task.status.name} />
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

  </div>);

export default TaskInWokr;