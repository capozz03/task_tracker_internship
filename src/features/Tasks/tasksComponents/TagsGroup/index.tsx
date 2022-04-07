import React, { useRef, useState, useEffect } from 'react';
import Tag from 'features/Tasks/tasksComponents/Tag';
import { TTag } from 'store/slice/task/entities';
import styles from './index.module.scss';

type TagsGroupProps = {
  tags: TTag[]
}

type OtherProps = {
  count: number
}

const Other = ({ count }: OtherProps) => (
  <span className={styles.others}>
    {`+${count}`}
  </span>
);

const TagsGroup = ({ tags }:TagsGroupProps) => {
  const wrap = useRef<HTMLDivElement | null>(null);
  const [countElement, setCountElement] = useState(0);

  useEffect(() => {
    const trackingHeightWrapper = () => {
      setCountElement(() => (
        wrap.current!.offsetHeight < 70 && wrap.current!.offsetWidth > 170 ? 3 : 2
      ));
    };
    window.addEventListener('resize', trackingHeightWrapper);
    return () => {
      window.removeEventListener('resize', trackingHeightWrapper);
    };
  }, []);

  useEffect(() => {
    setCountElement(wrap.current!.offsetHeight < 70 && wrap.current!.offsetWidth > 170 ? 3 : 2);
  }, [wrap.current, window]);
  return (
    <div ref={wrap} className={styles.markGroup}>
      {tags.slice(0, countElement).map((tag) => (
        <Tag tag={tag} key={tag.task_tag_id} />
      ))}
      { tags.length - countElement > 0 && <Other count={tags.length - countElement} /> }
    </div>);
};

export default TagsGroup;
