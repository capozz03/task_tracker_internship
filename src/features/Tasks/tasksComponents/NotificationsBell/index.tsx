import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import BellIcon from '../../../../shared/ui/icons/BellIcon';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationsSlice } from 'store/slice';

const NotificationBell = () => {
  const dispatch = useDispatch();
  const pagination = useSelector(NotificationsSlice.getPaginationSelector);
  const toggleVisibleNotificationHandle = () => {
    dispatch(NotificationsSlice.showNotification());
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
        [styles.present]: pagination.items_total !== 0,
      }])}
    >
      <BellIcon />
    </button>
  );
};

export default NotificationBell;
