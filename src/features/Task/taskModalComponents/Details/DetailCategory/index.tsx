import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';

type TProps = {
  name: string;
  type: 'details' | 'members';
  children: any;
}

const DetailCategory = ({ name, type, children }: TProps) => (
  <div className={styles.category}>
    <p
      className={classNames(styles.title, {
        [styles.titleDetails]: type === 'details',
        [styles.titleMembers]: type === 'members',
      })}
    >
      { name }
    </p>
    <div className={styles.labels}>
      {
        children
      }
    </div>
  </div>
);

export default DetailCategory;
