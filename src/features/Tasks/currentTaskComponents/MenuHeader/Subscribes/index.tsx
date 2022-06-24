import React, { useEffect } from 'react';
import EyeIcon from 'shared/ui/icons/EyeIcon';
import classNames from 'classnames';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { SubscribesSlice } from 'store/slice';
import Tooltip from 'features/Tasks/tasksComponents/TooltipForModal';

type SubscribeProps = {
  taskId: string;
}

const Subscribes = ({ taskId } : SubscribeProps) => {
  const dispatch = useDispatch();
  const isSubscribe = useSelector(SubscribesSlice.checkSubscribe);
  const subscribeID = useSelector(SubscribesSlice.getSubscribesSelector);
  const toggleSubscribe = () => {
    if (isSubscribe) {
      dispatch(SubscribesSlice.removeSubscribe(subscribeID[0].subscribe_id));
    } else {
      dispatch(SubscribesSlice.addSubscribe({
        relation_type: 'task',
        relation_id: taskId,
        notifies: {
          me: true,
        },
      }));
    }
  };
  useEffect(() => {
    dispatch(
      SubscribesSlice.getSubscribeAsync({
        relation_id: taskId,
        relation_type: 'task',
      }),
    );
    return () => {
      dispatch(SubscribesSlice.clear());
    };
  }, []);
  return (
    <Tooltip title={isSubscribe ? 'Уведомления включены' : 'Уведомления отключены'}>
      <button onClick={toggleSubscribe} type="button" className={classNames([styles.default, { [styles.active]: isSubscribe }])}>
        <EyeIcon />
      </button>
    </Tooltip>
  );
};

export default Subscribes;
