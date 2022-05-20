import React, { MouseEventHandler } from 'react';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { TTask } from 'store/slice/task/entities';
import { changeStatusTaskAsync } from 'store/slice/task/taskInbox/asyncActions';
import TaskStatus from '../../TaskStatus';
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
import PriorityChanger from '../../AttributeChangers/PriorityChanger';
import DateChanger from '../../AttributeChangers/DatesChanger';

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
      role="button"
      onClick={openTask}
      onKeyDown={() => {}}
      tabIndex={-1}
      className={classNames([
        styles.innerContent,
        { [styles.overdue]: moment(task?.exec_stop).diff(now()) < 0 },
      ])}
    >
      <div className={styles.wrap}>
        <div className={styles.cardName}>
          <CardNameText text={task.title} />
        </div>
        <div className={styles.indicators}>
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
          <TaskStatus defaultValue={task.status.name} onChange={statusHandler} />
        </div>
        <div className={styles.dateAndStatus}>
          <div className={styles.cardDate}>
            <DateChanger
              taskId={task.task_id}
              start={task.exec_start}
              end={task.exec_stop}
            />
          </div>
          <PriorityChanger taskId={task.task_id} taskPriority={task.priority} />
        </div>
        <div className={styles.cardTagsGroupt}>
          <TagsGroup tags={task.tags} />
        </div>
        <div className={styles.cardUsers}>
          <UserAssignedToTask users={task.roles} />
        </div>
      </div>
      <div className={styles.cardMenu}>
        <DropdownMenu task={task} />
      </div>
    </div>
  );
};

export default TaskInbox;
