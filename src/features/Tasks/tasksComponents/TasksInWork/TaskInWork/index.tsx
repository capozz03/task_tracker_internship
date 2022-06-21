import React, { MouseEventHandler } from 'react';
import { TTask } from 'store/slice/task/entities';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { TaskInWorkSlice, TaskFormSlice, SubscribesSlice } from 'store/slice';
import {
  CardAttachmentsCount,
  CardChecklistCount,
  CardNameText,
  DropdownMenu,
  TagsGroup,
  TaskStatus,
  UserAssignedToTask,
} from 'features/Tasks/tasksComponents';
import classNames from 'classnames';
import moment, { now } from 'moment';
import PriorityChanger from '../../PriorityChanger';
import DateChanger from '../../DateChanger';
import { usePermissions } from 'shared/helpers';

type TaskInWorkProps = {
  task: TTask;
};

const TaskInWork = ({ task }: TaskInWorkProps) => {
  const dispatch = useDispatch();
  const can = usePermissions(
    ['change.status'],
    task.roles,
  );

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
        <TaskStatus
          defaultValue={task.status.name}
          onChange={statusHandler}
          tooltip={can['change.status'] ? 'Изменить статус' : ''}
          isDisabled={!can['change.status']}
        />
      </div>
      <div className={styles.cardDate}>
        <DateChanger
          dateStartISO={task.exec_start}
          dateStopISO={task.exec_stop}
          taskId={task.task_id}
          roles={task.roles}
        />
      </div>
      <div className={styles.cardPriority}>
        <PriorityChanger
          priority={task.priority}
          currentTaskId={task.task_id}
          tooltip="Изменить приоритет"
          roles={task.roles}
        />
      </div>
      <div className={styles.cardTagsGroup}>
        <TagsGroup tags={task.tags} taskId={task.task_id} roles={task.roles} />
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

export default TaskInWork;
