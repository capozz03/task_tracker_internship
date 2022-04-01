import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

type PriorityProps = {
  type: 'high' | 'normal' | 'low';
};

const PriorityStatus = ({ type }: PriorityProps) => {
  const PriorityLevels = {
    high: 'Высокий',
    normal: 'Нормальный',
    low: 'Низкий',
  };

  return (
    <span className={styles.priorityStatus}>
      <span className={classNames(styles[type], styles.dot)} />
      <span className={styles.text}>{PriorityLevels[type]}</span>
    </span>
  );
};

export default PriorityStatus;
