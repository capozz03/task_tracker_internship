import React from 'react';
import styles from './index.module.scss';
import { TNotification } from 'store/slice/task/notifications/entities';
import { useDispatch } from 'react-redux';
import { NotificationsSlice, SubscribesSlice, TaskFormSlice } from 'store/slice';
import { UserAvatar } from 'features/Tasks/tasksComponents';
import SubscribeEye from './SubscribeEye';
import HeaderNotificationsArea from './Header';
import { NotificationCheckList, NotificationDefault } from './NotificationTypes';

const NotificationItem = ({ notification }: { notification: TNotification }) => {
  const dispatch = useDispatch();
  const notificationsComponents = {
    default: NotificationDefault,
    checklist: NotificationCheckList,
  };
  const definesTypeNotificationComponent = () => {
    switch (notification.history_command.command_code) {
      case 'task.check_list_assign': {
        return notificationsComponents.default;
      }
      case 'check_list.item_position_set': {
        return notificationsComponents.checklist;
      }
      default: {
        return notificationsComponents.default;
      }
    }
  };
  const Notifications = definesTypeNotificationComponent();
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
  return (
    <div className={styles.wrap}>
      <SubscribeEye />
      <div role="button" onKeyDown={(e) => e.preventDefault()} tabIndex={-1} onClick={showTaskHandle} className={styles.notification}>
        <HeaderNotificationsArea notification={notification} />
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
          <Notifications notification={notification} />
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
