import React, { ComponentProps, useEffect } from 'react';
import TaskInWork from './TaskInWork';
import styles from './index.module.scss';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFilters, TaskInWorkSlice } from 'store/slice';
import NewTask from '../NewTask';
import { Spin } from 'antd';

const TasksInWork = (props: ComponentProps<any>) => {
  const dispatch = useDispatch();
  const pagination = useSelector(TaskInWorkSlice.getPagination);
  const tasks = useSelector(TaskInWorkSlice.getTasks);
  const isLoading = useSelector(TaskInWorkSlice.isLoadingStatus);
  const filters = useSelector(TaskFilters.getFilters);
  const paginationHandler = (page: number, pageSize: number) => {
    dispatch(
      TaskInWorkSlice.getTasksAsync({
        page,
        per_page: pageSize,
        ...filters,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      TaskInWorkSlice.getTasksAsync({
        page: 1,
        per_page: 3,
        ...filters,
      }),
    );
  }, [filters]);

  return (
    <div className={styles.tasks_group} {...props}>
      <h4 className={styles.title}>
        В работе
        <span className={styles.totalCount}>{pagination && pagination.items_total}</span>
      </h4>
      <div>
        <Spin size="large" tip="Загрузка" spinning={isLoading}>
          {tasks && tasks.length !== 0
            ? tasks.map((task) => <TaskInWork key={task.task_id} task={task} />)
            : <p className={styles.noTasks}>Нет задач</p>}
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
