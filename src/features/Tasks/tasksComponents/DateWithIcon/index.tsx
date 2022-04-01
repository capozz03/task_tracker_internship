import React from 'react';
import classes from './index.module.scss';
import { ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import Date from '../Date';

type ScheduleProps = {
  date: string,
  type: 'clock' | 'calendar'
}

const DateWithIcon = ({ date, type }: ScheduleProps) => (
  <div className={classes[type]}>
    {
      type === 'clock'
        ? <ClockCircleOutlined className={classes.icon} />
        : ''
    }
    {
      type === 'calendar'
        ? <CalendarOutlined className={classes.icon} />
        : ''
    }
    <Date date={date} />
  </div>
);

export default DateWithIcon;
