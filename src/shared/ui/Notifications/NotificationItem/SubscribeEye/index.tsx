import React, { useState } from 'react';
import Tooltip from 'features/Tasks/tasksComponents/Tooltip';
import classNames from 'classnames';
import styles from 'shared/ui/Notifications/NotificationItem/index.module.scss';
import EyeNotificationIcon from 'shared/ui/icons/EyeNotificationIcon';
import EyeNotNotificationIcon from 'shared/ui/icons/EyeNotNotificationIcon';

// type SubscribeEyeProps = {
//   subscribeId: string;
//   taskId: string;
// }

const SubscribeEye = () => {
  const [subscribes, setSubscribes] = useState(true);
  const subscribeHandle = () => {
    setSubscribes(!subscribes);
    if (subscribes) {
      console.log('Должна быть отписка от уведомлений');
      // dispatch(SubscribesSlice.removeSubscribe(subscribeId));
    } else {
      console.log('Должна быть подписка на уведомления');
      // dispatch(SubscribesSlice.addSubscribe({
      //   relation_type: 'task',
      //   relation_id: taskId,
      //   notifies: {
      //     me: true,
      //   },
      // }));
    }
  };
  return (
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
  );
};

export default SubscribeEye;
