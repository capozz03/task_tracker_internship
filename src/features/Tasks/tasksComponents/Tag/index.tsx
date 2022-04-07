import React from 'react';
import styles from './index.module.scss';
import { TTag } from 'store/slice/task/entities';

type TagProps = {
  tag: TTag
}

const Tag = ({ tag }: TagProps) => (
  <span
    className={styles.mark}
    style={{
      border: `1px solid ${tag.color}`,
      backgroundColor: `${tag.color}0D`,
      color: `${tag.color}`,
    }}
  >
    { tag.name }
  </span>);

export default Tag;
