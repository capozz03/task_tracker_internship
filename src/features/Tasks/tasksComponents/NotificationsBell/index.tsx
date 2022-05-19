import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import BellIcon from '../../../../shared/ui/icons/BellIcon';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationsSlice } from 'store/slice';

const NotificationBell = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(NotificationsSlice.getNotificationsSelector);
  const toggleVisibleNotificationHandle = () => {
    dispatch(NotificationsSlice.toggleVisible());
  };
  useEffect(() => {
    dispatch(NotificationsSlice.getNotificationsAsync({
      viewed: false,
    }));
  }, []);
  return (
    <button
      type="button"
      onClick={toggleVisibleNotificationHandle}
      className={classNames([styles.notification, {
        [styles.present]: notifications.length > 0,
      }])}
    >
      <BellIcon />
    </button>
  );
};

export default NotificationBell;
