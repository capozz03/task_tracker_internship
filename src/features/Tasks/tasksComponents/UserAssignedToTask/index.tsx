import React, { useRef, useEffect, useState } from 'react';
import UserAvatar from 'features/Tasks/tasksComponents/UserAvatar';
import classes from './index.module.scss';
import { TRoles } from 'store/slice/task/entities';

type UserAssignedToTaskProps = {
  users: TRoles[]
}

type OtherProps = {
  count: number
}

// Вынес только потому что ESLint ругается
const Other = ({ count }: OtherProps) => (
  <div className={classes.others}>
    {`+${count}`}
  </div>
);

const UserAssignedToTask = ({ users }: UserAssignedToTaskProps) => {
  const wrap = useRef<HTMLDivElement | null>(null);
  const [countElement, setCountElement] = useState(0);
  const [width, setWidth] = useState(0);
  const colors = ['#FFC542', '#A461D8', '#A4E3FE', '#FC5A5A', '#A461D8', '#FF9AD5', '#50B5FF'];
  useEffect(() => {
    const trackingWidthWrapper = () => setWidth(() => wrap.current!.clientWidth);
    window.addEventListener('resize', trackingWidthWrapper);
    return () => {
      window.removeEventListener('resize', trackingWidthWrapper);
    };
  }, []);
  useEffect(() => {
    setCountElement(() => {
      const count = Math.floor(wrap.current!.offsetWidth / 41) - 1;
      return count + 1 < users.length ? count : users.length;
    });
  }, [wrap.current, width]);
  return (
    <div className={classes.users} ref={wrap}>
      {users.slice(0, countElement).map((user, index) => (
        <UserAvatar key={user.assign_user.user_id} user={user.assign_user} color={colors[index]} />
      ))}
      { users.length - countElement > 0 && <Other count={users.length - countElement} /> }
    </div>);
};

export default UserAssignedToTask;
