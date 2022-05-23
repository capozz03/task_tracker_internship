import React from 'react';
import { TNotification } from 'store/slice/task/notifications/entities';

type NotificationProps = {
  notification: TNotification;
}

const NotificationCheckList = ({ notification }: NotificationProps) => (
  <div>
    Чек-лист:
    { notification.history_command.command_name }
  </div>
);

export default NotificationCheckList;
