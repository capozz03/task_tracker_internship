import React, { MouseEventHandler } from 'react';
import styles from 'shared/ui/Notifications/NotificationItem/index.module.scss';
import Tooltip from 'features/Tasks/tasksComponents/Tooltip';
import classNames from 'classnames';
import CheckboxesReadNotificationIcon from 'shared/ui/icons/CheckboxesReadNotificationIcon';
import MailIcon from 'shared/ui/icons/MailIcon';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { NotificationsSlice } from 'store/slice';
import { TNotification } from 'store/slice/task/notifications/entities';

type HeaderNotificationsAreaProps = {
  notification: TNotification;
}

const HeaderNotificationsArea = ({ notification }: HeaderNotificationsAreaProps) => {
  const dispatch = useDispatch();
  const readHandle: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(NotificationsSlice.toggleReadNotificationAsync({
      viewed: !notification.viewed,
      subscribe_notify_id: [
        notification.subscribe_notify_id,
      ],
    }));
  };
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        { notification.history_command.relations[0].relation.title }
      </div>
      <div className={styles.statusAndTime}>
        <Tooltip title={!notification.viewed ? 'Отметить прочитанным' : 'Отметить непрочитанным'}>
          <button type="button" onClick={readHandle} className={classNames([styles.status], { [styles.mail]: !notification.viewed })}>
            {
              notification.viewed
                ? <CheckboxesReadNotificationIcon />
                : <MailIcon />
            }
          </button>
        </Tooltip>
        <span className={styles.time}>
          { moment(notification.history_command.created).format('HH:mm') }
        </span>
      </div>
    </header>
  );
};

export default HeaderNotificationsArea;
