import React, { useState } from 'react';
import classNames from 'classnames';
import styles from 'shared/ui/Notifications/NotificationItem/index.module.scss';
import EyeNotificationIcon from 'shared/ui/icons/EyeNotificationIcon';
import EyeNotNotificationIcon from 'shared/ui/icons/EyeNotNotificationIcon';
import { useDispatch } from 'react-redux';
import { SubscribesSlice } from 'store/slice';

type SubscribeEyeProps = {
  taskId: string;
}

const SubscribeEye = ({ taskId }: SubscribeEyeProps) => {
  const dispatch = useDispatch();
  const [subscribes, setSubscribes] = useState(true);
  const subscribeHandle: React.KeyboardEventHandler<HTMLButtonElement> | undefined = (e) => {
    if (e.key === 'n') {
      setSubscribes(!subscribes);
      if (subscribes) {
        dispatch(SubscribesSlice.removeSubscribeThroughTaskId(taskId));
      } else {
        dispatch(SubscribesSlice.addSubscribe({
          relation_type: 'task',
          relation_id: taskId,
          notifies: {
            me: true,
          },
        }));
      }
    }
  };
  return (
    <button
      type="button"
      onKeyDown={subscribeHandle}
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
  );
};

export default SubscribeEye;
