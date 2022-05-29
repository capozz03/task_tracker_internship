import React, { ComponentProps, useEffect, useState } from 'react';
import TaskInWork from './TaskInWork';
import styles from './index.module.scss';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFilters, TaskInWorkSlice } from 'store/slice';
import NewTask from '../NewTask';
import { Spin } from 'antd';
import { TSortType } from 'store/slice/task/entities';
import { SortByMobileScreen, SortByPCScreen } from '../SortBy';
import { useBreakPoint } from 'shared';

const TasksInWork = (props: ComponentProps<any>) => {
  const dispatch = useDispatch();
  const isMobile = useBreakPoint(768);
  const pagination = useSelector(TaskInWorkSlice.getPagination);
  const tasks = useSelector(TaskInWorkSlice.getTasks);
  const isLoading = useSelector(TaskInWorkSlice.isLoadingStatus);
  const filters = useSelector(TaskFilters.getFilters);
  const [sortType, setSortType] = useState<TSortType>('date~DESC');

  const paginationHandler = (page: number, pageSize: number) => {
    dispatch(
      TaskInWorkSlice.getTasksAsync({
        sort: sortType,
        page,
        per_page: pageSize,
        ...filters,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      TaskInWorkSlice.getTasksAsync({
        sort: sortType,
        per_page: pagination!.per_page,
        page: pagination!.page_current,
        ...filters,
      }),
    );
  }, [filters]);

  return (
    <div className={styles.tasks_group} {...props}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          В работе
          <span className={styles.totalCount}>{pagination && pagination.items_total}</span>
        </h4>
        <div className={styles.sort}>
          {isMobile ? (
            <SortByMobileScreen disabled={tasks?.length === 0} setSortType={setSortType} />
          ) : (
            <SortByPCScreen disabled={tasks?.length === 0} setSortType={setSortType} />
          )}
        </div>
      </div>
      <div>
        <Spin size="large" tip="Загрузка" spinning={isLoading}>
          {tasks && tasks.length !== 0 ? (
            tasks.map((task) => <TaskInWork key={task.task_id} task={task} />)
          ) : (
            <p className={styles.noTasks}>Нет задач</p>
          )}
        </Spin>
        <div>
          <NewTask taskStatusId="372d63ff-3ae3-4be2-a606-38940d7f8c8f" />
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
    </div>
  );
};

export default TasksInWork;
