import React from 'react';
import classes from './index.module.scss';
import { TMark } from 'store/slice/task/entities';

type MarkProps = {
  mark: TMark
}

const Mark = ({ mark }: MarkProps) => {
  const styles = {
    border: `1px solid ${mark.color}`,
    backgroundColor: `${mark.color}0D`,
    color: `${mark.color}`,
  };
  return (
    <span className={classes.mark} style={styles}>
      { mark.name }
    </span>);
};

export default Mark;
