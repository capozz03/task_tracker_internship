import React, { MouseEventHandler } from 'react';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { TTask } from 'store/slice/task/entities';
import { changeStatusTaskAsync } from 'store/slice/task/taskInbox/asyncActions';
import TaskStatus from '../../TaskStatus';
import DateWithIconClock from '../../DateWithIconClock';
import TagsGroup from '../../TagsGroup';
import UserAssignedToTask from '../../UserAssignedToTask';
import DropdownMenu from 'features/Tasks/tasksComponents/DropdownMenu';
import CardNameText from '../../CardNameText';
import CardChecklistCount from '../../CardChecklistCount';
import CardAttachmentsCount from '../../CardAttachmentsCount';
import { getTaskByIdAsync } from 'store/slice/task/taskForm';
import classNames from 'classnames';
import moment, { now } from 'moment';
import { SubscribesSlice } from 'store/slice';
import PriorityChanger from '../../PriorityChanger';

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
  const openTask: MouseEventHandler<HTMLElement> = () => {
    dispatch(getTaskByIdAsync(task.task_id));
    dispatch(
      SubscribesSlice.getSubscribeAsync({
        relation_id: task.task_id,
        relation_type: 'task',
      }),
    );
  };
  return (
    <div
      className={classNames([
        styles.wrap,
        { [styles.overdue]: moment(task?.exec_stop).diff(now()) < 0 },
      ])}
      role="button"
      onClick={openTask}
      onKeyDown={() => {}}
      tabIndex={-1}
    >
      <div className={styles.cardName}>
        <CardNameText text={task.title} />
      </div>
      <div className={styles.cardFilesAndCheckbox}>
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

      <div className={styles.cardStatus}>
        <TaskStatus defaultValue={task.status.name} onChange={statusHandler} tooltip="Изменить статус" />
      </div>
      <div className={styles.cardDate}>
        <DateWithIconClock date={task.exec_stop} />
      </div>
      <div className={styles.cardPriority}>
        <PriorityChanger priority={task.priority} currentTaskId={task.task_id} tooltip="Изменить приоритет" />
      </div>
      <div className={styles.cardTagsGroup}>
        <TagsGroup tags={task.tags} taskId={task.task_id} />
      </div>
      <div className={styles.cardUsers}>
        <UserAssignedToTask users={task.roles} />
      </div>
      <div className={styles.cardMenu}>
        <DropdownMenu task={task} />
      </div>
    </div>
  );
};

export default TaskInbox;
