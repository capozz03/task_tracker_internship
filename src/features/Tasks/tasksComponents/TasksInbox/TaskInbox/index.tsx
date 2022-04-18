import React, { MouseEventHandler } from 'react';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { TTask } from 'store/slice/task/entities';
import { changeStatusTaskAsync } from 'store/slice/task/taskInbox/asyncActions';
import TaskStatus from '../../TaskStatus';
import DateWithIconClock from '../../DateWithIconClock';
import TagsGroup from '../../TagsGroup';
import PriorityStatus from '../../PriorityStatus';
import UserAssignedToTask from '../../UserAssignedToTask';
import DropdownMenu from 'features/Tasks/tasksComponents/DropdownMenu';
import CardNameText from '../../CardNameText';
import CardChecklistCount from '../../CardChecklistCount';
import CardAttachmentsCount from '../../CardAttachmentsCount';
import { getTaskByIdAsync } from 'store/slice/task/taskForm';

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
  };
  return (
    <div
      className={styles.innerContent}
      role="button"
      onClick={openTask}
      onKeyDown={() => {}}
      tabIndex={-1}
    >
      <div className={styles.wrap}>
        <div className={styles.cardName}>
          <CardNameText text={task.title} />
        </div>
        <div className={styles.indicators}>
          <CardAttachmentsCount count={task.storage_files_meta.total} />
          <CardChecklistCount checkListTotal={2} checkListChecked={2} />
        </div>

        <div className={styles.cardStatus}>
          <TaskStatus defaultValue={task.status.name} onChange={statusHandler} />
        </div>
        <div className={styles.dateAndStatus}>
          <div className={styles.cardDate}>
            <DateWithIconClock date={task.created} />
          </div>
          {task.priority && <PriorityStatus type={task.priority.name} />}
        </div>
        <div className={styles.cardTagsGroupt}>
          <TagsGroup tags={task.tags} />
        </div>
        <div className={styles.cardUsers}>
          <UserAssignedToTask users={task.roles} />
        </div>
      </div>
      <div className={styles.cardMenu}>
        <DropdownMenu taskId={task.task_id} taskStatusId={task.status.task_status_id} />
      </div>
    </div>
  );
};

export default TaskInbox;
