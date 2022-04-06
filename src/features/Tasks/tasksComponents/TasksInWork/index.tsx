import React from 'react';
import { TPagination, TTask } from 'store/slice/task/entities';
import TaskInWork from './TaskInWork';
import styles from './index.module.scss';
import Pagination from '../Pagination';

type TasksInWorkProps = {
  tasks: TTask[],
  pagination: TPagination,
}

const TasksInWork = ({ tasks, pagination }: TasksInWorkProps) => (
  <div className={styles.tasks_group}>
    <h4 className={styles.title}>В работе</h4>
    {tasks.map((task) => (
      <TaskInWork key={task.task_id} task={task} />
    ))}
    <div className={styles.pagination}>
      {
        pagination.page_total !== 1 && <Pagination total={pagination.page_total} />
      }

    </div>

  </div>);

export default TasksInWork;
