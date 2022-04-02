import React from 'react';
import Button from './tasksComponents/Button';

export const TasksPageComponent = () => (
  <span style={{ display: 'flex', height: '100px' }}>
    <Button type="primary">Кнопа</Button>
    <Button type="default"> Неважная кнопа</Button>
  </span>
);
