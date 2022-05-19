import React, { MouseEventHandler, useState } from 'react';
import styles from './index.module.scss';
import { TNotification } from 'store/slice/task/notifications/entities';
import EyeNotificationIcon from 'shared/ui/icons/EyeNotificationIcon';
import EyeNotNotificationIcon from 'shared/ui/icons/EyeNotNotificationIcon';
import classNames from 'classnames';
import Tooltip from 'features/Tasks/tasksComponents/Tooltip';
import moment from 'moment';
import CheckboxesReadNotificationIcon from 'shared/ui/icons/CheckboxesReadNotificationIcon';
import MailIcon from 'shared/ui/icons/MailIcon';
import { useDispatch } from 'react-redux';
import { NotificationsSlice, SubscribesSlice, TaskFormSlice } from 'store/slice';
import { UserAvatar } from 'features/Tasks/tasksComponents';

const NotificationItem = ({ notification }: { notification: TNotification }) => {
  const [subscribes, setSubscribes] = useState(true);
  const dispatch = useDispatch();
  const subscribeHandle = () => {
    setSubscribes(!subscribes);
    // if (isSubscribe) {
    //   dispatch(SubscribesSlice.removeSubscribe(subscribeID[0].subscribe_id));
    // } else {
    //   dispatch(SubscribesSlice.addSubscribe({
    //     relation_type: 'task',
    //     relation_id: taskId,
    //     notifies: {
    //       me: true,
    //     },
    //   }));
    // }
  };
  const showTaskHandle = () => {
    dispatch(TaskFormSlice.getTaskByIdAsync(notification.history_command.relations[0].relation_id));
    dispatch(SubscribesSlice.getSubscribeAsync({
      relation_id: notification.history_command.relations[0].relation_id,
      relation_type: 'task',
    }));
    dispatch(NotificationsSlice.toggleReadNotificationAsync({
      viewed: true,
      subscribe_notify_id: [
        notification.subscribe_notify_id,
      ],
    }));
  };
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
    <div className={styles.wrap}>
      <Tooltip title={subscribes ? 'Уведомления включены' : 'Уведомления отключены'}>
        <button
          type="button"
          onClick={subscribeHandle}
          className={classNames([styles.subscribeToNotifications],
            {
              [styles.unsubscribe]: !subscribes })}
        >
          {
            subscribes
              ? <EyeNotificationIcon />
              : <EyeNotNotificationIcon />
          }
        </button>
      </Tooltip>
      <button type="button" onClick={showTaskHandle} className={styles.notification}>
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
        <div>
          <div className={styles.userAssigned}>
            <div className={styles.avatar}>
              <UserAvatar user={notification.history_command.user} color="#A461D8" />
            </div>
            <div className={styles.nameAndEvent}>
              <div className={styles.name}>
                { notification.history_command.user.name }
              </div>
              <div className={styles.event}>
                { notification.history_command.command_name }
              </div>
            </div>

          </div>
        </div>
      </button>
    </div>
  );
};

export default NotificationItem;
