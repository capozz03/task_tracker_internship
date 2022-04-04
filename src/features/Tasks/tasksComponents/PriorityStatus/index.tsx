import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { Priority } from './constants';

type PriorityProps = {
  type: keyof typeof Priority;
};

const PriorityStatus = ({ type }: PriorityProps) => (
  <span className={styles.priorityStatus}>
    <span className={classNames(styles[type], styles.dot)} />
    <span className={styles.text}>{Priority[type]}</span>
  </span>
);

export default PriorityStatus;
