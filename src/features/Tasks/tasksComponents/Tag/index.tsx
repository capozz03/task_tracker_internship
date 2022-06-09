import React from 'react';
import styles from './index.module.scss';
import { TTag } from 'store/slice/task/entities';
import XIcon from 'shared/ui/icons/XIcon';

type TagProps = {
  tag: TTag,
  deleteHandle?: () => void,
}

const Tag = ({ tag, deleteHandle }: TagProps) => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (deleteHandle) deleteHandle();
    e.stopPropagation();
  };

  return (
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
            <button onClick={onClick} type="button" className={styles.btnDelete}>
              <XIcon />
            </button>
          )
        }

    </span>
  );
};

export default Tag;
