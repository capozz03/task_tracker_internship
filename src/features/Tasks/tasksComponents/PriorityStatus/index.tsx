import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

type PriorityProps = {
  type: string;
};

const PriorityStatus = ({ type }: PriorityProps) => {
  let color;
  if (type === 'Высокий') { color = 'high'; } else if (type === 'Средний') { color = 'normal'; } else if (type === 'Низкий') { color = 'low'; } else { color = 'white'; }

  return (
    <span className={styles.priorityStatus}>
      <span className={classNames(styles[color], styles.dot)} />
      <span className={styles.text}>{type}</span>
    </span>);
};

export default PriorityStatus;
