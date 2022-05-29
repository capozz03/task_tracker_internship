import React, { ComponentProps, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBreakPoint } from 'shared/helpers/hooks/useBreakPoint';
import { TaskFilters, TaskFailedSlice } from 'store/slice';
import { SortByMobileScreen, SortByPCScreen } from '../SortBy';
import style from './index.module.scss';
import Pagination from '../Pagination';
import { TSortType } from 'store/slice/task/entities';
import { Spin } from 'antd';
import TaskFailed from './TaskFailed';

const TasksFailed = (props: ComponentProps<any>) => {
  const isMobile = useBreakPoint(768);
  const dispatch = useDispatch();
  const tasks = useSelector(TaskFailedSlice.getTasks);
  const pagination = useSelector(TaskFailedSlice.getPagination);
  const isLoading = useSelector(TaskFailedSlice.isLoadingStatus);
  const filters = useSelector(TaskFilters.getFilters);
  const [sortType, setSortType] = useState<TSortType>('date~DESC');

  const paginationHandler = (page: number, pageSize: number): void => {
    dispatch(
      TaskFailedSlice.getTasksAsync({
        sort: sortType,
        page,
        per_page: pageSize,
        ...filters,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      TaskFailedSlice.getTasksAsync({
        sort: sortType,
        per_page: pagination!.per_page,
        page: pagination!.page_current,
        ...filters,
      }),
    );
  }, [sortType, filters]);

  return (
    <div className={style.tasks_group} {...props}>
      <div className={style.wrapTitle}>
        <h4 className={style.title}>
          Не выполнено
          <span className={style.totalCount}>{pagination && pagination.items_total}</span>
        </h4>
        {isMobile ? (
          <SortByMobileScreen disabled={tasks?.length === 0} setSortType={setSortType} />
        ) : (
          <SortByPCScreen disabled={tasks?.length === 0} setSortType={setSortType} />
        )}
      </div>
      <Spin size="large" tip="Загрузка" spinning={isLoading}>
        {tasks && tasks.length !== 0 ? (
          tasks.map((task) => <TaskFailed key={task.task_id} task={task} />)
        ) : (
          <p className={style.noTasks}>Нет задач</p>
        )}
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

export default TasksFailed;
