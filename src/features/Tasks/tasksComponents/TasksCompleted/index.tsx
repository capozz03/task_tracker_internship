import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBreakPoint } from 'shared/helpers/hooks/useBreakPoint';
import { TaskFilters, TaskCompletedSlice } from 'store/slice';
import { SortByMobileScreen, SortByPCScreen } from '../SortBy';
import TaskCompleted from './TaskCompleted';
import style from './index.module.scss';
import Pagination from '../Pagination';
import { Collapse, Spin } from 'antd';
import { getSortTasksCompleted, setSortTasksCompleted } from 'store/slice/task/taskCompleted';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';

const TasksCompleted: FC = (props) => {
  const isMobile = useBreakPoint(768);
  const dispatch = useDispatch();
  const tasks = useSelector(TaskCompletedSlice.getTasks);
  const pagination = useSelector(TaskCompletedSlice.getPagination);
  const isLoading = useSelector(TaskCompletedSlice.isLoadingStatus);
  const filters = useSelector(TaskFilters.getFilters);
  const sortType = useSelector(getSortTasksCompleted);
  const setSortTasks = setSortTasksCompleted;

  const paginationHandler = (page: number, pageSize: number) => {
    dispatch(
      TaskCompletedSlice.getTasksAsync({
        sort: sortType,
        page,
        per_page: pageSize,
        ...filters,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      TaskCompletedSlice.getTasksAsync({
        sort: sortType,
        per_page: pagination!.per_page,
        page: 1,
        ...filters,
      }),
    );
  }, [sortType, filters]);

  return (
    <div className={style.tasks_group} {...props}>
      <div className={style.wrapTitle}>
        <h4 className={style.title}>
          Завершено
          <span className={style.totalCount}>{pagination && pagination.items_total}</span>
        </h4>
        <div className={style.sort}>
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
      <Collapse ghost defaultActiveKey={1}>
        <CollapsePanel key={1} header="">
          <Spin size="large" tip="Загрузка" spinning={isLoading}>
            {tasks && tasks.length !== 0 ? (
              tasks.map((task) => <TaskCompleted key={task.task_id} task={task} />)
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
              pageSize={pagination!.per_page}
            />
            )}
          </div>
        </CollapsePanel>
      </Collapse>
    </div>
  );
};

export default TasksCompleted;
