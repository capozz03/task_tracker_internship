import React from 'react';
import moment from 'moment';
import classes from './index.module.scss';
import { ClockCircleOutlined } from '@ant-design/icons';

type DateWithIconClockProps = {
  date: string
}

const DateWithIconClock = ({ date }: DateWithIconClockProps) => {
  const dateExec = moment(date);
  const today = moment().startOf('day');
  const tomorrow = moment().add(1, 'day').startOf('day');
  const tomorrowEnd = moment().add(1, 'day').endOf('day');
  const yesterday = moment().add(-1, 'day').startOf('day');
  const dateFormat = () => {
    if (dateExec > today && dateExec < tomorrow) return 'сегодня';
    if (dateExec > tomorrow && dateExec < tomorrowEnd) return 'завтра';
    if (dateExec > yesterday) return 'вчера';
    return dateExec.format('DD MMM YYYY').replace('.', '');
  };

  return (
    <span className={classes.text}>
      <ClockCircleOutlined className={classes.icon} />
      { dateFormat() }
    </span>
  );
};

export default DateWithIconClock;
