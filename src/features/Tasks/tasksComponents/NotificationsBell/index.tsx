import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import BellIcon from '../../../../shared/ui/icons/BellIcon';
import { useSelector } from 'react-redux';
import { NotificationsSlice } from 'store/slice';

const NotificationBell = () => {
  const notifications = useSelector(NotificationsSlice.getNotificationsSelector);
  return (
    <div className={classNames([styles.notification, {
      [styles.present]: notifications.length > 0,
    }])}
    >
      <BellIcon />
    </div>
  );
};

export default NotificationBell;
