import React from 'react';
import { TNotification } from 'store/slice/task/notifications/entities';

type NotificationProps = {
  notification: TNotification;
}

const NotificationDefault = ({ notification }: NotificationProps) => (
  <div>
    По умолчанию:
    { notification.history_command.command_name }
  </div>
);

export default NotificationDefault;
