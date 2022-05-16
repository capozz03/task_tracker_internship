import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationsSlice } from 'store/slice';
import styles from './index.module.css';

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(NotificationsSlice.getNotificationsSelector);
  const pagination = useSelector(NotificationsSlice.getPaginationSelector);
  useEffect(() => {
    dispatch(NotificationsSlice.getNotificationsAsync({
      page: pagination.page_current,
      per_page: pagination.per_page,
    }));
  }, []);
  return (
    <div className={styles.notifications}>
      { notifications.map((notification) => (
        <div key={notification.subscribe_notify_id}>
          { notification.history_command.command_name }
        </div>
      )) }
    </div>
  );
};

export default Notifications;
