import React from 'react';
import CardName from './tasksComponents/CardName';

const props = {
  name: 'Какая-то задача',
  attachments: 5,
  checkListTotal: 9,
  checkListChecked: 4,
};
const moreProps = {
  name: 'Какая-то задача, но чуть подлиннее, совсем чуть-чуть',
  attachments: 55,
  checkListTotal: 99,
  checkListChecked: 44,
};

export const TasksPageComponent = () => (
  <div style={{ maxWidth: '300px' }}>
    <CardName {...props} />
    <CardName {...moreProps} />
  </div>
);
