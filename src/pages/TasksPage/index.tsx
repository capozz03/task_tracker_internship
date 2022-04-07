import React from 'react';
import { TasksPageComponent } from 'features';
import UserAvatarMenu from 'features/Auth/UserAvatarMenu';

export const TasksPage = () => (
  <div style={{ width: '100%', padding: '20px 40px', display: 'flex', justifyContent: 'space-between' }}>
    <TasksPageComponent />
    <UserAvatarMenu />
  </div>
);
