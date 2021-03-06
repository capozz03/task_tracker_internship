import React, { MouseEventHandler } from 'react';
import styles from './index.module.scss';
import { TNotification } from 'store/slice/task/notifications/entities';
import { useDispatch } from 'react-redux';
import { NotificationsSlice, SubscribesSlice } from 'store/slice';
import SubscribeEye from './SubscribeEye';
import HeaderNotificationsArea from './Header';
import { NotificationDefault, NotificationRoleAssign } from './NotificationTypes';
import { useNavigate } from 'react-router-dom';

const NotificationItem = ({ notification }: { notification: TNotification }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notificationsComponents = {
    default: NotificationDefault,
    roleAssign: NotificationRoleAssign,
  };
  const definesTypeNotificationComponent = () => {
    switch (notification.history_command.command_code) {
      case 'task.role_un_assign':
      case 'task.role_assign': {
        return notificationsComponents.roleAssign;
      }
      default: {
        return notificationsComponents.default;
      }
    }
  };
  const Notifications = definesTypeNotificationComponent();
  const showTaskHandle: MouseEventHandler<HTMLDivElement> = () => {
    navigate(`/${notification.history_command.params.task_to?.task_id
      || notification.history_command.relations[0].relation_id}`);
    dispatch(SubscribesSlice.getSubscribeAsync({
      relation_id: notification.history_command.relations[0].relation_id,
      relation_type: 'task',
    }));
    if (!notification.viewed) {
      dispatch(NotificationsSlice.toggleReadNotificationAsync({
        viewed: true,
        subscribe_notify_id: [
          notification.subscribe_notify_id,
        ],
      }));
    }
  };
  return (
    <div className={styles.wrap}>
      <SubscribeEye taskId={notification.history_command.relations[0].relation_id} />
      <div
        role="button"
        onKeyDown={(e) => e.preventDefault()}
        tabIndex={-1}
        onClick={showTaskHandle}
        className={styles.notification}
      >
        <HeaderNotificationsArea notification={notification} />
        <div>
          <Notifications notification={notification} />
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
