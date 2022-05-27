import React from 'react';
import { TNotification } from 'store/slice/task/notifications/entities';
import styles from 'shared/ui/Notifications/NotificationItem/index.module.scss';
import stylesCustom from './index.module.scss';
import { UserAvatar } from 'features/Tasks/tasksComponents';

type NotificationProps = {
  notification: TNotification;
}

const NotificationRoleAssign = ({ notification }: NotificationProps) => {
  const event = notification.history_command;
  return (
    <div>
      <div className={styles.userAssigned}>
        <div className={styles.avatar}>
          <UserAvatar user={event.user} color="#A461D8" />
        </div>
        <div className={styles.nameAndEvent}>
          <div className={styles.name}>
            { event.user.name }
          </div>
          <div className={styles.event}>
            { `${event.command_name} ` }
            <strong>
              { event.params.task_role?.name }
            </strong>
          </div>
          <div className={stylesCustom.content}>
            { event.params.assign_user && <UserAvatar user={event.params.assign_user} color="#C3AEFF" /> }
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationRoleAssign;
