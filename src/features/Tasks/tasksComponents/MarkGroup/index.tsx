import React, { useRef, useState, useEffect } from 'react';
import Mark from 'features/Tasks/tasksComponents/Mark';
import { TMark } from 'store/slice/task/entities';
import styles from './index.module.scss';

type MarkGroupProps = {
  marks: TMark[]
}

type OtherProps = {
  count: number
}

const Other = ({ count }: OtherProps) => (
  <span className={styles.others}>
    {`+${count}`}
  </span>
);

const MarkGroup = ({ marks }:MarkGroupProps) => {
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
      {marks.slice(0, countElement).map((mark) => (
        <Mark mark={mark} key={mark.task_tag_id} />
      ))}
      { marks.length - countElement > 0 && <Other count={marks.length - countElement} /> }
    </div>);
};

export default MarkGroup;
