import React, { ComponentProps, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TaskInboxSlice } from 'store/slice';
import styles from './index.module.scss';
import TaskInbox from './TaskInbox';
import Pagination from '../Pagination';

const TasksInbox = (props: ComponentProps<any>) => {
  const dispatch = useDispatch();
  const pagination = useSelector(TaskInboxSlice.getPagination);
  const tasks = useSelector(TaskInboxSlice.getTasks);
  const paginationHandler = (page: number, pageSize: number) => {
    dispatch(
      TaskInboxSlice.getTasksAsync({
        page,
        per_page: pageSize,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      TaskInboxSlice.getTasksAsync({
        page: 1,
        per_page: 3,
      }),
    );
  }, []);

  return (
    <div className={styles.tasks_group} {...props}>
      <h4 className={styles.title}>
        Входящие
        <span className={styles.totalCount}>
          { pagination
            && pagination.items_total }
        </span>
        шт.
      </h4>
      {tasks && tasks.map((task) => <TaskInbox key={task.task_id} task={task} />)}
      <div className={styles.pagination}>
        {pagination && (
          <Pagination
            onChange={paginationHandler}
            total={pagination.items_total}
          />
        )}
      </div>
    </div>
  );
};

export default TasksInbox;
