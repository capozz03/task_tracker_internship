import React, { KeyboardEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationsSlice, TaskFilters } from 'store/slice';
import styles from './index.module.scss';
import NotificationItem from './NotificationItem';
import { Spin } from 'antd';

const { getIsFiltersMenuShow } = TaskFilters;

const Notifications = () => {
  const dispatch = useDispatch();
  const isSidebarShow = useSelector(getIsFiltersMenuShow);
  const notifications = useSelector(NotificationsSlice.getNotificationsSelector);
  const pagination = useSelector(NotificationsSlice.getPaginationSelector);
  const isLoading = useSelector(NotificationsSlice.isLoading);
  const [isReadAll, setIsReadAll] = useState(false);
  const showMoreHandle: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (pagination.items_total !== 0) {
      dispatch(NotificationsSlice.nextPage());
      dispatch(NotificationsSlice.pushNotificationsAsync({
        viewed: false,
      }));
    }
  };
  const backgroundPlaceClickHandle: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(event);
    // dispatch(NotificationsSlice.hiddenNotification());
  };
  const backgroundPlaceKeyHandle: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Escape') {
      dispatch(NotificationsSlice.hiddenNotification());
    }
  };
  const readAllHandle: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();
    setIsReadAll(true);
    await dispatch(NotificationsSlice.readAllNotificationAsync());
    setIsReadAll(false);
  };
  useEffect(() => {
    dispatch(NotificationsSlice.getNotificationsAsync({
      viewed: false,
    }));
  }, []);
  return (
    <div
      role="button"
      tabIndex={-1}
      onKeyDown={backgroundPlaceKeyHandle}
      onClick={backgroundPlaceClickHandle}
      className={styles.backgroundPlace}
    >
      <div className={styles.notifications} style={{ right: isSidebarShow ? '275px' : '30px' }}>
        <header className={styles.header}>
          <div className={styles.title}>
            Уведомления
            { pagination.items_total !== 0 && <span className={styles.countNotifications}>{ pagination.items_total > 100 ? '99+' : pagination.items_total }</span>}
          </div>
          <div>
            {
              pagination.items_total !== 0
                ? <button className={styles.readAllBtn} onClick={readAllHandle} type="button">Прочитать все</button>
                : <span className={styles.readAllText}>Прочитать все</span>
            }
          </div>
        </header>
        <Spin spinning={isLoading || isReadAll} tip={isReadAll && 'Прочитать все…'}>
          {
            pagination.items_total !== 0 || notifications.length !== 0
              ? (
                <div className={styles.body}>
                  { notifications.map((notification) => (
                    <NotificationItem
                      key={notification.subscribe_notify_id}
                      notification={notification}
                    />
                  )) }
                </div>
              )
              : (
                <p>Нет уведомлений</p>
              )
          }
        </Spin>
        <footer>
          {
            (pagination.items_total !== 0 && pagination.items_total > 10)
              && <button type="button" onClick={showMoreHandle} className={styles.btnShowMore}>Показать больше</button>
          }
        </footer>
      </div>
    </div>
  );
};

export default Notifications;
