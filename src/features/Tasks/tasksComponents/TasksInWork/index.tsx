import React, { FC, useEffect } from 'react';
import TaskInWork from './TaskInWork';
import styles from './index.module.scss';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFilters, TaskInWorkSlice } from 'store/slice';
import NewTask from '../NewTask';
import { Spin } from 'antd';
import { SortByMobileScreen, SortByPCScreen } from '../SortBy';
import { TaskStatuses, useBreakPoint } from 'shared';

const TasksInWork: FC = (props) => {
  const dispatch = useDispatch();
  const isMobile = useBreakPoint(768);
  const pagination = useSelector(TaskInWorkSlice.getPagination);
  const tasks = useSelector(TaskInWorkSlice.getTasks);
  const isLoading = useSelector(TaskInWorkSlice.isLoadingStatus);
  const filters = useSelector(TaskFilters.getFilters);
  const sortType = useSelector(TaskInWorkSlice.getSortTasksInWork);
  const setSortTasks = TaskInWorkSlice.setSortTasksInWork;

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
        page: 1,
        ...filters,
      }),
    );
  }, [sortType, filters]);

  return (
    <div className={styles.tasks_group} {...props}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          В работе
          <span className={styles.totalCount}>{pagination && pagination.items_total}</span>
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
      <div>
        <Spin size="large" tip="Загрузка" spinning={isLoading}>
          {tasks && tasks.length !== 0 ? (
            tasks.map((task) => <TaskInWork key={task.task_id} task={task} />)
          ) : (
            <p className={styles.noTasks}>Нет задач</p>
          )}
        </Spin>
        <div className={styles.footer}>
          <div className={styles.createTask}>
            <NewTask taskStatusId={TaskStatuses.IN_WORK} />
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
    </div>
  );
};

export default TasksInWork;
