import React, { useRef, useEffect, useState } from 'react';
import UserAvatar from 'features/Tasks/tasksComponents/UserAvatar';
import classes from './index.module.scss';

type UserAssignedToTaskProps = {
users: any[]
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
  const wrap = useRef(null);
  const [countElement, setCountElement] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const resizeFN = (e: Event) => {
      // @ts-ignore
      setWidth(e.target.innerWidth);
    };
    window.addEventListener('resize', resizeFN);
    return () => {
      window.removeEventListener('resize', resizeFN);
    };
  }, []);
  useEffect(() => {
    // TODO: Как исправить?
    // @ts-ignore
    setCountElement(Math.floor(wrap.current.offsetWidth / 42) - 1);
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
