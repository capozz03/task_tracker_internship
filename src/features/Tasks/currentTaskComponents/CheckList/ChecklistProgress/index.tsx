import React from 'react';
import styles from './index.module.scss';

type ChecklistProgressProps = {
  percent: number;
}

const ChecklistProgress = ({ percent }: ChecklistProgressProps) => (
  <div className={styles.wrap}>
    <span className={styles.text}>
      {percent}
      %
    </span>
    <div className={styles.progressBar}>
      <div className={styles.progress} style={{ width: `${percent}%` }} />
    </div>
  </div>
);

export default ChecklistProgress;
