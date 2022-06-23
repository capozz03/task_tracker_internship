import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBreakPoint } from 'shared/helpers/hooks/useBreakPoint';
import { TaskFilters, TaskFailedSlice } from 'store/slice';
import { SortByMobileScreen, SortByPCScreen } from '../SortBy';
import style from './index.module.scss';
import Pagination from '../Pagination';
import { Collapse, Spin } from 'antd';
import TaskFailed from './TaskFailed';
import { getSortTasksFailed, setSortTasksFailed } from 'store/slice/task/taskFailed';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';
import { useSettings } from 'shared';

const TasksFailed: FC = (props) => {
  const isMobile = useBreakPoint(768);
  const dispatch = useDispatch();
  const tasks = useSelector(TaskFailedSlice.getTasks);
  const pagination = useSelector(TaskFailedSlice.getPagination);
  const isLoading = useSelector(TaskFailedSlice.isLoadingStatus);
  const filters = useSelector(TaskFilters.getFilters);
  const sortType = useSelector(getSortTasksFailed);
  const setSortTasks = setSortTasksFailed;

  const isSettigsApplied = useSettings({
    listName: 'failed',
    sort: sortType,
    pagination,
    setters: {
      setPagination: TaskFailedSlice.setPaginationTasksFailed,
      setSort: TaskFailedSlice.setSortTasksFailed,
    },
  });

  const paginationHandler = (page: number, pageSize: number) => {
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
    if (isSettigsApplied) {
      dispatch(
        TaskFailedSlice.getTasksAsync({
          sort: sortType,
          per_page: pagination!.per_page,
          page: 1,
          ...filters,
        }),
      );
    }
  }, [sortType, filters, isSettigsApplied]);

  return (
    <div className={style.tasks_group} {...props}>
      <div className={style.wrapTitle}>
        <h4 className={style.title}>
          Не выполнено
          <span className={style.totalCount}>{pagination && pagination.items_total}</span>
        </h4>
        {
          isSettigsApplied
          && (
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
          )
        }
      </div>
      <Collapse ghost defaultActiveKey={1}>
        <CollapsePanel key={1} header="">
          <Spin size="large" tip="Загрузка" spinning={isLoading}>
            {tasks && tasks.length !== 0 ? (
              tasks.map((task) => <TaskFailed key={task.task_id} task={task} />)
            ) : (
              <p className={style.noTasks}>Нет задач</p>
            )}
          </Spin>
          <div className={style.pagination}>
            { isSettigsApplied && pagination && (
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

export default TasksFailed;
