import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TasksPageComponent } from 'features';

import { useDispatch } from 'react-redux';
import { logoutUser } from 'store/slice/user';

export const TasksPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutAction = () => {
    dispatch(logoutUser());
    navigate('/auth');
  };

  return (
    <div>
      <TasksPageComponent />
      <button type="button" onClick={logoutAction}>Выйти</button>
    </div>);
};
