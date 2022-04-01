import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';

type DateProps = {
  date: string
}

const Date = ({ date }: DateProps) => {
  moment().locale('ru');
  const dates = moment(date).format('DD MMM YYYY').replace('.', '');
  return (
    <span>{ dates }</span>
  );
};

export default Date;
