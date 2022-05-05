import React from 'react';
import styles from './index.module.scss';

type TProps = {
  name: string;
  children: any;
}

const MemberCategory = ({ name, children }: TProps) => (
  <div className={styles.category}>
    <p className={styles.title}>{ name }</p>
    <div className={styles.labels}>
      {
        children
      }
    </div>
  </div>
);

export default MemberCategory;
