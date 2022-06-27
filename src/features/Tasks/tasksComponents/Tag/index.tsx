import React, { useState } from 'react';
import styles from './index.module.scss';
import { TTag } from 'store/slice/task/entities';
import XIcon from 'shared/ui/icons/XIcon';
import { Spin } from 'antd';

type TagProps = {
  tag: TTag,
  deleteHandle?: () => void,
}

const Tag = ({ tag, deleteHandle }: TagProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setIsLoading(true);
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
              {
                isLoading
                  ? <Spin size="small" />
                  : <XIcon />
              }
            </button>
          )
        }

    </span>
  );
};

export default Tag;
