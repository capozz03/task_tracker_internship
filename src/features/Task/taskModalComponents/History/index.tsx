import React, { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { HistoryLabelIcon } from 'shared/ui/icons';
import { TaskFormSlice } from 'store/slice';
import { Spin } from 'antd';
import HistoryUnit from './HistoryUnit';
import { useBreakPoint } from 'shared';
import styles from './index.module.scss';
import classNames from 'classnames';

const TaskHistory = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(TaskFormSlice.isLoadingHistory);
  const history = useSelector(TaskFormSlice.getHistory);
  const pagination = useSelector(TaskFormSlice.getHistoryPagination);
  const currentTaskId = useSelector(TaskFormSlice.getTaskFormId);

  const isMobile = useBreakPoint(1400);
  const [showHistory, setShowHistory] = useState(true);

  const showChange = () => setShowHistory((prev) => !prev);

  const loadHistory = () => {
    const { page_current: current, per_page: limit } = pagination;
    if ((current < pagination.page_total || current === 0) && currentTaskId) {
      dispatch(TaskFormSlice.getTaskHistoryAsync({
        taskId: currentTaskId,
        page: current + 1,
        limit,
      }));
    }
  };

  const onViewChanged = (isLoading: boolean) =>
    (inView: boolean, entry: IntersectionObserverEntry) => {
      if (inView && entry.isIntersecting && !isLoading) loadHistory();
    };

  const observerElement = (isLoading: boolean) => (
    <InView threshold={0} onChange={onViewChanged(isLoading)}>
      {({ ref }) => (
        <>
          <li className={styles.lastElement} ref={ref} key="_observer_point" />
          { isLoading && <Spin className={styles.spin} /> }
        </>
      )}
    </InView>
  );

  useEffect(() => {
    dispatch(TaskFormSlice.resetTaskHistory());
  }, [currentTaskId]);

  useEffect(() => {
    if (history.length === 0 && !isLoading) loadHistory();
  }, [history, isLoading]);

  return (
    <div className={styles.historyWrapper}>
      <div className={styles.header}>
        <HistoryLabelIcon />
        <h5>????????????????</h5>
        {
          isMobile
          && (
            <button type="button" onClick={showChange}>
              { showHistory ? '???????????? ??????????????????????' : '???????????????? ??????????????????????' }
            </button>
          )
        }
      </div>
      <ul className={classNames(styles.historyList, { [styles.historyHidden]: !showHistory })}>
        {
          history?.map((unit) => (
            <HistoryUnit unit={unit} key={unit.history_command_id} />
          ))
        }
        {
          !!currentTaskId && observerElement(isLoading)
        }
      </ul>
    </div>
  );
};

export default TaskHistory;
