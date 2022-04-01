import React from 'react';
import moment from 'moment';

type DateProps = {
  date: string
}

const Date = ({ date }: DateProps) => {
  const dates = moment(date).format('DD MMM YYYY').replace('.', '');
  return (
    <span>{ dates }</span>
  );
};

export default Date;
