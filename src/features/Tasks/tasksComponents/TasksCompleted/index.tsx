import React, { ComponentProps, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBreakPoint } from 'shared/helpers/hooks/useBreakPoint';
import { TaskFilters, TaskCompletedSlice } from 'store/slice';
import { SortByMobileScreen, SortByPCScreen } from '../SortBy';
import TaskCompleted from './TaskCompleted';
import style from './index.module.scss';
import Pagination from '../Pagination';
import { TSortType } from 'store/slice/task/entities';
import { Spin } from 'antd';

const TasksCompleted = (props: ComponentProps<any>) => {
  const isMobile = useBreakPoint(768);
  const dispatch = useDispatch();
  const tasks = useSelector(TaskCompletedSlice.getTasks);
  const pagination = useSelector(TaskCompletedSlice.getPagination);
  const isLoading = useSelector(TaskCompletedSlice.isLoadingStatus);
  const filterAssignedToMe = useSelector(TaskFilters.getFilterAssignedTo);
  const [sortType, setSortType] = useState<TSortType>('date~DESC');

  const paginationHandler = (page: number, pageSize: number): void => {
    dispatch(
      TaskCompletedSlice.getTasksAsync({
        sort: sortType,
        page,
        per_page: pageSize,
        assigned_to_me: filterAssignedToMe === 'my' ? true : null,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      TaskCompletedSlice.getTasksAsync({
        sort: sortType,
        page: 1,
        per_page: 3,
        assigned_to_me: filterAssignedToMe === 'my' ? true : null,
      }),
    );
  }, [sortType, filterAssignedToMe]);

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
      <Spin size="large" tip="Загрузка" spinning={isLoading}>
        {tasks && tasks.map((task) => <TaskCompleted key={task.task_id} task={task} />)}
      </Spin>
      <div className={style.pagination}>
        {pagination && (
          <Pagination
            current={pagination.page_current}
            onChange={paginationHandler}
            total={pagination.items_total}
          />
        )}
      </div>
    </div>
  );
};

export default TasksCompleted;
