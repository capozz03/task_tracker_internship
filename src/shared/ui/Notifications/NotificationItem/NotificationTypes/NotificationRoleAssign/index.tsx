import React from 'react';
import { TNotification } from 'store/slice/task/notifications/entities';
import styles from 'shared/ui/Notifications/NotificationItem/index.module.scss';
import stylesCustom from './index.module.scss';
import UserAvatarForModal from 'features/Tasks/tasksComponents/UserAvatarForModal';
import { CheckIcon } from 'shared/ui/icons/TaskHistory';

type NotificationProps = {
  notification: TNotification;
}

const NotificationRoleAssign = ({ notification }: NotificationProps) => {
  const event = notification.history_command;
  return (
    <div>
      <div className={styles.userAssigned}>
        <div className={styles.avatar}>
          <UserAvatarForModal user={event.user} color="#A461D8" />
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
            { event.params.assign_user
              && (
                <>
                  <UserAvatarForModal user={event.params.assign_user} color="#C3AEFF" />
                  <div>
                    <strong>{ event.params.assign_user?.name }</strong>
                    <span className={styles.rolesDesc}>
                      <CheckIcon />
                      { event.params.task_role?.name || 'Неизвестная роль' }
                    </span>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationRoleAssign;
