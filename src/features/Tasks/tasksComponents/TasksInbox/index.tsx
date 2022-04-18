import React, { ComponentProps, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBreakPoint } from 'shared/helpers/hooks/useBreakPoint';
import { TaskInboxSlice, TaskInWorkSlice } from 'store/slice';
import { NewTask, SortByMobileScreen, SortByPCScreen } from '..';
import TaskInbox from './TaskInbox';
import { TaskStatuses } from 'shared/helpers/enums';
import styles from './index.module.scss';
import Pagination from '../Pagination';
import { Spin } from 'antd';

type TSortType = 'date~DESC' | 'title~ASC';

const TasksInbox = (props: ComponentProps<any>) => {
  const isMobile = useBreakPoint(768);
  const dispatch = useDispatch();
  const tasks = useSelector(TaskInboxSlice.getTasks);
  const pagination = useSelector(TaskInboxSlice.getPagination);
  const isLoading = useSelector(TaskInWorkSlice.isLoadingStatus);
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
  }, [sortType]);

  return (
    <div className={styles.tasks_group} {...props}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          Входящие
          <span className={styles.totalCount}>{pagination && pagination.items_total}</span>
          шт.
        </h4>
        <div className={styles.sort}>
          {isMobile ? (
            <SortByMobileScreen setSortType={setSortType} />
          ) : (
            <SortByPCScreen setSortType={setSortType} />
          )}
        </div>
      </div>
      {isLoading ? (
        <div className={styles.spin}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {tasks && tasks.map((task) => <TaskInbox key={task.task_id} task={task} />)}
          <div className={styles.footer}>
            <div className={styles.createTask}>
              <NewTask taskStatusId={TaskStatuses.CREATED} />
            </div>
            <div className={styles.pagination}>
              {pagination && (
                <Pagination
                  current={pagination.page_current}
                  onChange={paginationHandler}
                  total={pagination.items_total}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TasksInbox;
