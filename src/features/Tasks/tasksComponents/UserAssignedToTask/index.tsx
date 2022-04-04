import React, { useRef, useEffect, useState } from 'react';
import UserAvatar from 'features/Tasks/tasksComponents/UserAvatar';
import classes from './index.module.scss';
import { TUser } from 'store/slice/user/entities';

type UserAssignedToTaskProps = {
  users: TUser[]
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
  const wrap = useRef<HTMLDivElement>(document.createElement('div'));
  const [countElement, setCountElement] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const resizeFN = () => {
      setWidth(() => wrap.current.clientWidth);
    };
    window.addEventListener('resize', resizeFN);
    return () => {
      window.removeEventListener('resize', resizeFN);
    };
  }, []);
  useEffect(() => {
    setCountElement(() => {
      const count = Math.floor(wrap.current.offsetWidth / 41) - 1;
      return count + 1 < users.length ? count : users.length;
    });
  }, [wrap.current, width]);
  return (
    <div className={classes.users} ref={wrap}>
      {users.slice(0, countElement).map((user) => (
        <UserAvatar key={user.user_id} user={user} />
      ))}
      {
        users.length - countElement > 0
          ? <Other count={users.length - countElement} />
          : ''
      }
    </div>);
};

export default UserAssignedToTask;
