import React, { ComponentProps, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TaskInboxSlice } from 'store/slice';
import styles from './index.module.scss';
import TaskInbox from './TaskInbox';
import Pagination from '../Pagination';
import { useBreakPoint } from 'shared/helpers/hooks/useBreakPoint';
import { NewTask, SortByMobileScreen, SortByPCScreen } from '..';
import { TaskStatuses } from 'shared/helpers/enums';

type TSortType = 'date~DESC' | 'title~ASC';

const TasksInbox = (props: ComponentProps<any>) => {
  const isMobile = useBreakPoint(768);
  const dispatch = useDispatch();
  const pagination = useSelector(TaskInboxSlice.getPagination);
  const tasks = useSelector(TaskInboxSlice.getTasks);
  const [sortType, setSortType] = useState<TSortType>('date~DESC');

  const paginationHandler = (page: number, pageSize: number) => {
    dispatch(
      TaskInboxSlice.getTasksAsync({
        sort: sortType,
        page,
        per_page: pageSize,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      TaskInboxSlice.getTasksAsync({
        sort: sortType,
        page: 1,
        per_page: 3,
      }),
    );
  }, []);

  return (
    <div className={styles.tasks_group} {...props}>
      <div className={styles.header}>
        <h4 className={styles.title}>Входящие</h4>
        <div className={styles.sort}>
          {isMobile ? (
            <SortByMobileScreen setSortType={setSortType} />
          ) : (
            <SortByPCScreen setSortType={setSortType} />
          )}
        </div>
      </div>
      {tasks && tasks.map((task) => <TaskInbox key={task.task_id} task={task} />)}
      <div className={styles.footer}>
        <div className={styles.createTask}>
          <NewTask taskStatusId={TaskStatuses.CREATED} />
        </div>
        <div className={styles.pagination}>
          {pagination && (
            <Pagination
              onChange={paginationHandler}
              total={pagination.page_total * pagination.per_page}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksInbox;
