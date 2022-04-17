import React, { ComponentProps, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBreakPoint } from 'shared/helpers/hooks/useBreakPoint';
import { TaskCompletedSlice, TaskInWorkSlice } from 'store/slice';
import { SortByMobileScreen, SortByPCScreen } from '../SortBy';
import TaskCompleted from './TaskCompleted';
import style from './index.module.scss';
import Pagination from '../Pagination';
import { TSortType } from 'store/slice/task/entities';
import { RequestStatuses } from '../../../../shared';
import styles from '../TasksInbox/index.module.scss';
import { Spin } from 'antd';

const TasksCompleted = (props: ComponentProps<any>) => {
  const isMobile = useBreakPoint(768);
  const dispatch = useDispatch();
  const tasks = useSelector(TaskCompletedSlice.getTasks);
  const pagination = useSelector(TaskCompletedSlice.getPagination);
  const statusRequest = useSelector(TaskInWorkSlice.getStatus);
  const [sortType, setSortType] = useState<TSortType>('date~DESC');

  const paginationHandler = (page: number, pageSize: number): void => {
    dispatch(
      TaskCompletedSlice.getTasksAsync({
        sort: sortType,
        page,
        per_page: pageSize,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      TaskCompletedSlice.getTasksAsync({
        sort: sortType,
        page: 1,
        per_page: 3,
      }),
    );
  }, [sortType]);

  return (
    <div className={style.tasks_group} {...props}>
      <div className={style.wrapTitle}>
        <h4 className={style.title}>
          Завершено
          <span className={style.totalCount}>{pagination && pagination.items_total}</span>
          шт.
        </h4>
        {isMobile ? (
          <SortByMobileScreen setSortType={setSortType} />
        ) : (
          <SortByPCScreen setSortType={setSortType} />
        )}
      </div>
      {statusRequest === RequestStatuses.LOADING ? (
        <div className={styles.spin}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {tasks && tasks.map((task) => <TaskCompleted key={task.task_id} task={task} />)}
          <div className={style.pagination}>
            {pagination && (
              <Pagination
                current={pagination.page_current}
                onChange={paginationHandler}
                total={pagination.items_total}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TasksCompleted;
