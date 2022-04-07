import React, { ComponentProps, useEffect } from 'react';
import TaskInWork from './TaskInWork';
import styles from './index.module.scss';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { TaskInWorkSlice } from 'store/slice';

const TasksInWork = (props: ComponentProps<any>) => {
  const dispatch = useDispatch();
  const pagination = useSelector(TaskInWorkSlice.getPagination);
  const tasks = useSelector(TaskInWorkSlice.getTasks);
  const paginationHandler = (page: number, pageSize: number) => {
    dispatch(TaskInWorkSlice.getTasksAsync({
      page,
      per_page: pageSize,
    }));
  };

  useEffect(() => {
    dispatch(TaskInWorkSlice.getTasksAsync({
      page: 1,
      per_page: 3,
    }));
  }, []);

  return (
    <div className={styles.tasks_group} {...props}>
      <h4 className={styles.title}>В работе</h4>
      {tasks && tasks.map((task) => (
        <TaskInWork key={task.task_id} task={task} />
      ))}
      <div className={styles.pagination}>
        {
          pagination
          && <Pagination
            onChange={paginationHandler}
            total={pagination.page_total * pagination.per_page}
          />
        }
      </div>

    </div>);
};

export default TasksInWork;
