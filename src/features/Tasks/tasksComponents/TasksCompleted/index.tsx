import React, { ComponentProps, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBreakPoint } from 'shared/helpers/hooks/useBreakPoint';
import { TaskCompletedSlice } from 'store/slice';
import { SortByMobileScreen, SortByPCScreen } from '../SortBy';
import TaskCompleted from './TaskCompleted';
import style from './index.module.scss';
import Pagination from '../Pagination';
import { TSortType } from 'store/slice/task/entities';

const TasksCompleted = (props: ComponentProps<any>) => {
  const isMobile = useBreakPoint(768);
  const dispatch = useDispatch();
  const tasks = useSelector(TaskCompletedSlice.getTasks);
  const pagination = useSelector(TaskCompletedSlice.getPagination);
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
        <h4 className={style.title}>Завершено</h4>
        {isMobile ? (
          <SortByMobileScreen setSortType={setSortType} />
        ) : (
          <SortByPCScreen setSortType={setSortType} />
        )}
      </div>
      {tasks && tasks.map((task) => <TaskCompleted key={task.task_id} task={task} />)}
      <div className={style.pagination}>
        {pagination && (
          <Pagination
            onChange={paginationHandler}
            total={pagination.page_total * pagination.per_page}
          />
        )}
      </div>
    </div>
  );
};

export default TasksCompleted;
