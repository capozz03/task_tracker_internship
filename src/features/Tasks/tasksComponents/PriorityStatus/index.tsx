import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { Priority } from './constants';

type PriorityProps = {
  type: keyof typeof Priority | null | undefined;
};

const PriorityStatus = ({ type }: PriorityProps) => (
  <span className={styles.priorityStatus}>
    {type ? (
      <>
        <span className={classNames(styles[Priority[type]], styles.dot)} />
        <span className={styles.text}>{type}</span>
      </>
    ) : (
      <span className={styles.text}>Без статуса</span>
    )}
  </span>
);

export default PriorityStatus;
