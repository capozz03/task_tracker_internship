import React from 'react';
import styles from './index.module.scss';
import { TMark } from 'store/slice/task/entities';

type MarkProps = {
  mark: TMark
}

const Mark = ({ mark }: MarkProps) => (
  <span
    className={styles.mark}
    style={{
      border: `1px solid ${mark.color}`,
      backgroundColor: `${mark.color}0D`,
      color: `${mark.color}`,
    }}
  >
    { mark.name }
  </span>);

export default Mark;
