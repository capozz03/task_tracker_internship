import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBreakPoint, useSettings } from 'shared/helpers';
import { TaskFilters, TaskInboxSlice } from 'store/slice';
import { NewTask, SortByMobileScreen, SortByPCScreen } from '..';
import TaskInbox from './TaskInbox';
import { TaskStatuses } from 'shared/helpers/enums';
import styles from './index.module.scss';
import Pagination from '../Pagination';
import { Collapse, Spin } from 'antd';
import { getSortTasksInbox, setSortTasksInbox, setPaginationTasksInbox } from 'store/slice/task/taskInbox';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';

const TasksInbox: FC = (props) => {
  const isMobile = useBreakPoint(768);
  const dispatch = useDispatch();
  const tasks = useSelector(TaskInboxSlice.getTasks);
  const isLoading = useSelector(TaskInboxSlice.isLoadingStatus);
  const filters = useSelector(TaskFilters.getFilters);
  const sortType = useSelector(getSortTasksInbox);
  const pagination = useSelector(TaskInboxSlice.getPagination);

  const isSettigsApplied = useSettings({
    listName: 'inbox',
    sort: sortType,
    pagination,
    setters: {
      setPagination: setPaginationTasksInbox,
      setSort: setSortTasksInbox,
    },
  });

  const paginationHandler = (page: number, pageSize: number) => {
    dispatch(
      TaskInboxSlice.getTasksAsync({
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
        TaskInboxSlice.getTasksAsync({
          sort: sortType,
          per_page: pagination!.per_page,
          page: 1,
          ...filters,
        }),
      );
    }
  }, [sortType, filters, isSettigsApplied]);

  return (
    <div className={styles.tasks_group} {...props}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          Входящие
          <span className={styles.totalCount}>{ pagination && pagination.items_total }</span>
        </h4>
        {
          isSettigsApplied
          && (
            <div className={styles.sort}>
              { isMobile ? (
                <SortByMobileScreen
                  disabled={tasks?.length === 0}
                  setSortTasks={setSortTasksInbox}
                />
              ) : (
                <SortByPCScreen
                  disabled={tasks?.length === 0}
                  sortType={sortType}
                  setSortTasks={setSortTasksInbox}
                />
              ) }
            </div>
          )
        }
      </div>
      <Collapse ghost defaultActiveKey={1}>
        <CollapsePanel key={1} header="">
          <Spin size="large" tip="Загрузка" spinning={isLoading}>
            { tasks && tasks.length !== 0 ? (
              tasks.map((task) => <TaskInbox key={task.task_id} task={task} />)
            ) : (
              <p className={styles.noTasks}>Нет задач</p>
            ) }
          </Spin>
          <div className={styles.footer}>
            <div className={styles.createTask}>
              <NewTask taskStatusId={TaskStatuses.CREATED} />
            </div>
            <div className={styles.pagination}>
              { isSettigsApplied && pagination && (
                <Pagination
                  current={pagination.page_current}
                  onChange={paginationHandler}
                  total={pagination.items_total}
                  pageSize={pagination!.per_page}
                />
              ) }
            </div>
          </div>
        </CollapsePanel>
      </Collapse>
    </div>
  );
};

export default TasksInbox;
