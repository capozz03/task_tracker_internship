import React from 'react';
import moment from 'moment';
import classes from './index.module.scss';
import { ClockCircleOutlined } from '@ant-design/icons';

type DateWithIconClockProps = {
  date: string
}

const DateWithIconClock = ({ date }: DateWithIconClockProps) => {
  const dates = moment(date).format('DD MMM YYYY').replace('.', '');
  return (
    <span className={classes.text}>
      <ClockCircleOutlined className={classes.icon} />
      { dates }
    </span>
  );
};

export default DateWithIconClock;
