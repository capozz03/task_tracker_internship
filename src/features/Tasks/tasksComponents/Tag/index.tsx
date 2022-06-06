import React, { FC } from 'react';
import styles from './index.module.scss';
import { TTag } from 'store/slice/task/entities';
import XIcon from 'shared/ui/icons/XIcon';

type TagProps = {
  tag: TTag,
  deleteHandle?: () => void,
}

const Tag: FC<TagProps> = ({ tag, deleteHandle }) => (
  <span
    className={styles.mark}
    style={{
      border: `1px solid ${tag.color}`,
      backgroundColor: `${tag.color}0D`,
      color: `${tag.color}`,
    }}
  >
    { tag.name }
    {
        deleteHandle && (
          <button onClick={deleteHandle} type="button" className={styles.btnDelete}>
            <XIcon />
          </button>
        )
      }

  </span>);

export default Tag;
