import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationsSlice } from 'store/slice';
import styles from './index.module.scss';
import NotificationItem from './NotificationItem';
import { Spin } from 'antd';
import { AsyncThunkPayloadCreatorReturnValue } from '@reduxjs/toolkit';
import { alert } from 'shared/ui/Alert';

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(NotificationsSlice.getNotificationsSelector);
  const pagination = useSelector(NotificationsSlice.getPaginationSelector);
  const isLoading = useSelector(NotificationsSlice.isLoading);
  const [isReadAll, setIsReadAll] = useState(false);
  const showMoreHandle = () => {
    if (pagination.items_total !== 0) {
      dispatch(NotificationsSlice.nextPage());
      dispatch(NotificationsSlice.pushNotificationsAsync({
        viewed: false,
      }));
    }
  };
  const readAllHandle = async () => {
    setIsReadAll(true);
    const response: AsyncThunkPayloadCreatorReturnValue<any, any> = await dispatch(
      NotificationsSlice.getNotificationsAsync({
        viewed: false,
        per_page: 10000000,
      }));
    await dispatch(NotificationsSlice.toggleReadNotificationAsync({
      viewed: true,
      subscribe_notify_id: response.payload.data.map(
        (notification: any) => notification.subscribe_notify_id),
    }));
    alert('Все уведомления прочитаны', 'success');
    await dispatch(NotificationsSlice.getNotificationsAsync({
      viewed: false,
      per_page: 10,
    }));
    setIsReadAll(false);
  };
  useEffect(() => {
    dispatch(NotificationsSlice.getNotificationsAsync({
      viewed: false,
    }));
  }, []);
  return (
    <div className={styles.notifications}>
      <header className={styles.header}>
        <div className={styles.title}>
          Уведомления
          { pagination.items_total !== 0 && <span className={styles.countNotifications}>{ pagination.items_total > 100 ? '99+' : pagination.items_total }</span>}
        </div>
        <div>
          {
            pagination.items_total !== 0 && <button className={styles.readAllBtn} onClick={readAllHandle} type="button">Прочитать все</button>
          }
        </div>
      </header>
      <Spin spinning={isLoading || isReadAll} tip={isReadAll && 'Прочитать все…'}>
        {
          pagination.items_total !== 0
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
              <h2>Новых уведомлений нет</h2>
            )
        }
      </Spin>
      <footer>
        {
          pagination.items_total !== 0
            && <button type="button" onClick={showMoreHandle} className={styles.btnShowMore}>Показать больше</button>
        }
      </footer>
    </div>
  );
};

export default Notifications;
