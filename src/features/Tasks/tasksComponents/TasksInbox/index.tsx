import React, { ComponentProps, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBreakPoint } from 'shared/helpers/hooks/useBreakPoint';
import { TaskFilters, TaskInboxSlice } from 'store/slice';
import { NewTask, SortByMobileScreen, SortByPCScreen } from '..';
import TaskInbox from './TaskInbox';
import { TaskStatuses } from 'shared/helpers/enums';
import styles from './index.module.scss';
import Pagination from '../Pagination';
import { Spin } from 'antd';
import { getSortTasksInbox, setSortTasksInbox } from 'store/slice/task/taskInbox';

const TasksInbox = (props: ComponentProps<any>) => {
  const isMobile = useBreakPoint(768);
  const dispatch = useDispatch();
  const tasks = useSelector(TaskInboxSlice.getTasks);
  const pagination = useSelector(TaskInboxSlice.getPagination);
  const isLoading = useSelector(TaskInboxSlice.isLoadingStatus);
  const filters = useSelector(TaskFilters.getFilters);
  const sortType = useSelector(getSortTasksInbox);
  const setSortTasks = setSortTasksInbox;
  const [pageSize, setPageSize] = useState(3);

  const paginationHandler = (page: number, pageSize: number): void => {
    dispatch(
      TaskInboxSlice.getTasksAsync({
        sort: sortType,
        page,
        per_page: pageSize,
        ...filters,
      }),
    );
    setPageSize(pageSize);
  };

  useEffect(() => {
    dispatch(
      TaskInboxSlice.getTasksAsync({
        sort: sortType,
        page: 1,
        per_page: pageSize,
        ...filters,
      }),
    );
  }, [sortType, filters]);

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
            <SortByMobileScreen disabled={tasks?.length === 0} setSortTasks={setSortTasks} />
          ) : (
            <SortByPCScreen
              disabled={tasks?.length === 0}
              sortType={sortType}
              setSortTasks={setSortTasks}
            />
          )}
        </div>
      </div>
      <Spin size="large" tip="Загрузка" spinning={isLoading}>
        {tasks && tasks.length !== 0 ? (
          tasks.map((task) => <TaskInbox key={task.task_id} task={task} />)
        ) : (
          <p className={styles.noTasks}>Нет задач</p>
        )}
      </Spin>
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
    </div>
  );
};

export default TasksInbox;
