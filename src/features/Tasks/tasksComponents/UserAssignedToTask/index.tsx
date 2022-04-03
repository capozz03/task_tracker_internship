import React from 'react';
import UserAvatar from 'features/Tasks/tasksComponents/UserAvatar';
import classes from './index.module.scss';

type UserAssignedToTaskProps = {
users: any[]
}

const UserAssignedToTask = ({ users }: UserAssignedToTaskProps) => (
  <div className={classes.users}>
    {users.map((user) => (
      <UserAvatar user={user} />
    ))}
  </div>);

export default UserAssignedToTask;
