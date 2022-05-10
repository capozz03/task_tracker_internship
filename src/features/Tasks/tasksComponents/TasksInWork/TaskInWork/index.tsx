import React, { MouseEventHandler } from 'react';
import { TTask } from 'store/slice/task/entities';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { TaskInWorkSlice, TaskFormSlice } from 'store/slice';
import {
  CardAttachmentsCount,
  CardChecklistCount,
  CardNameText,
  DateWithIconClock,
  DropdownMenu,
  PriorityStatus,
  TagsGroup,
  TaskStatus,
  UserAssignedToTask,
} from 'features/Tasks/tasksComponents';

type TaskInWorkProps = {
  task: TTask;
};

const TaskInWork = ({ task }: TaskInWorkProps) => {
  const dispatch = useDispatch();
  const statusHandler = (value: string) => {
    dispatch(
      TaskInWorkSlice.changeStatusTaskAsync({
        task_id: task.task_id,
        task_status_id: value,
      }),
    );
  };
  const openTask: MouseEventHandler<HTMLElement> = () => {
    dispatch(TaskFormSlice.getTaskByIdAsync(task.task_id));
  };
  return (
    <div
      className={styles.wrap}
      role="button"
      onClick={openTask}
      onKeyDown={() => {}}
      tabIndex={-1}
    >
      <div className={styles.cardName}>
        <CardNameText text={task.title} />
      </div>
      <div className={styles.cardFilesAndCheckbox}>
        { task.storage_files_meta
          && <CardAttachmentsCount count={task.storage_files_meta.total} /> }
        {
          task.progress && task.progress.total !== 0 && (
            <CardChecklistCount
              checkListTotal={task.progress.total}
              checkListChecked={task.progress.completed}
            />
          )
        }

      </div>
      <div className={styles.cardStatus}>
        <TaskStatus defaultValue={task.status.name} onChange={statusHandler} />
      </div>
      <div className={styles.cardDateAndPriority}>
        <div className={styles.cardDate}>
          <DateWithIconClock date={task.exec_stop} />
        </div>
        <div className={styles.cardPriority}>
          {task.priority && <PriorityStatus type={task.priority.name} />}
        </div>
      </div>
      <div className={styles.cardTagsGroup}>
        <TagsGroup tags={task.tags} />
      </div>
      <div className={styles.cardUsers}>
        <UserAssignedToTask users={task.roles} />
      </div>
      <div className={styles.cardMenu}>
        <DropdownMenu
          task={task}
        />
      </div>
    </div>
  );
};

export default TaskInWork;
