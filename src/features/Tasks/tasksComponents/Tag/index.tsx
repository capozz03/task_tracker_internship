import React, { useState } from 'react';
import styles from './index.module.scss';
import { TTag } from 'store/slice/task/entities';
import XIcon from 'shared/ui/icons/XIcon';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { TagsSlice } from 'store/slice';

type TagProps = {
  tag: TTag,
  deleteHandle?: () => void,
}

const Tag = ({ tag, deleteHandle }: TagProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const tags = useSelector(TagsSlice.getTagsSelector);
  const tag1 = tags.find((el) => el.task_tag_id === tag.task_tag_id) || tag;
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setIsLoading(true);
    if (deleteHandle) deleteHandle();
    e.stopPropagation();
  };

  return (
    <span
      className={styles.mark}
      style={{
        border: `1px solid ${tag1.color}`,
        backgroundColor: `${tag1.color}0D`,
        color: `${tag1.color}`,
      }}
    >
      { tag1.name }
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
