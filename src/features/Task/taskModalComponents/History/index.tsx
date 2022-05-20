/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { InView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { HistoryLabelIcon } from 'shared/ui/icons';
import { TaskFormSlice } from 'store/slice';
import { Spin } from 'antd';
import { UserAvatar } from 'features/Tasks/tasksComponents';
import { formatDateOnTaskHistoryView } from 'shared/helpers/convert';
import styles from './index.module.scss';

const TaskHistory = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(TaskFormSlice.isLoadingHistory);
  const history = useSelector(TaskFormSlice.getHistory);
  const pagination = useSelector(TaskFormSlice.getHistoryPagination);
  const currentTaskId = useSelector(TaskFormSlice.getTaskFormId);

  useEffect(() => {
    dispatch(TaskFormSlice.resetTaskHistory());
  }, [currentTaskId]);

  const onViewChanged = (inView: boolean, entry: IntersectionObserverEntry) => {
    if (inView && entry.isIntersecting) {
      const { page_current: current, per_page: limit } = pagination;
      if ((current < pagination.page_total || current === 0) && currentTaskId) {
        dispatch(TaskFormSlice.getTaskHistoryAsync({
          taskId: currentTaskId,
          page: current + 1,
          limit,
        }));
      }
    }
  };

  const observerElement = () => (
    <InView threshold={0} onChange={onViewChanged}>
      {({ ref }) => (
        <>
          <li className={styles.lastElement} ref={ref} key="_observer_point" />
          { isLoading && <Spin className={styles.spin} /> }
        </>
      )}
    </InView>
  );

  return (
    <div className={styles.historyWrapper}>
      <div className={styles.header}>
        <HistoryLabelIcon />
        <h5>Действия</h5>
      </div>
      <ul className={styles.historyList}>
        {
          history?.map((unit) => (
            <li className={styles.historyItem} key={unit.history_command_id}>
              <div className={styles.action}>
                <UserAvatar user={unit.user} color="#FFC28A" />
                <p className={styles.actionUserName}>{unit.user.name}</p>
                <p className={styles.actionDescription}>{unit.command_name.toLowerCase()}</p>
              </div>
              <span className={styles.actionTime}>
                {formatDateOnTaskHistoryView(unit.created)}
              </span>
            </li>
          ))
        }
        {
          !!currentTaskId && observerElement()
        }
      </ul>
    </div>
  );
};

export default TaskHistory;
