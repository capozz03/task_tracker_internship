import React, { useEffect, useRef, useState } from 'react';
import UserAvatar from 'features/Tasks/tasksComponents/UserAvatar';
import classes from './index.module.scss';
import { TRoles } from 'store/slice/task/entities';
import { uniqBy } from 'lodash';
import { Popover } from 'antd';
import Tooltip from '../Tooltip';

const colors = ['#FFC542', '#A461D8', '#A4E3FE', '#FC5A5A', '#A461D8', '#FF9AD5', '#50B5FF'];
type UserAssignedToTaskProps = {
  users: TRoles[];
};

const UsersPopoverContent = (users: TRoles[]) => (
  <div className={classes.usersPopoverContent}>
    {/* eslint-disable-next-line react/destructuring-assignment */}
    {uniqBy(users, (item) => item.assign_user.user_id).map((user, index) => (
      <span className={classes.row}>
        <UserAvatar user={user.assign_user} color={colors[index % colors.length]} />
        <span className={classes.role}>{`${user.task_role.name}: `}</span>
        <span className={classes.name}>{user.assign_user.name}</span>
      </span>
    ))}
  </div>
);

type OtherProps = {
  count: number;
  allUsers: TRoles[];
};
// Вынес только потому что ESLint ругается
const Other = ({ count, allUsers }: OtherProps) => (
  <Popover content={UsersPopoverContent(allUsers)}>
    <div className={classes.others}>{`+${count}`}</div>
  </Popover>
);

const UserAssignedToTask = ({ users }: UserAssignedToTaskProps) => {
  const wrap = useRef<HTMLDivElement | null>(null);
  const [countElement, setCountElement] = useState(0);
  const [width, setWidth] = useState(0);
  users = uniqBy(users, (e) => e.assign_user.user_id);

  const calculationCountElement = () => {
    const count = Math.floor(wrap.current!.offsetWidth / 40) - 1;
    return count + 1 < users.length ? count : users.length;
  };

  useEffect(() => {
    const trackingWidthWrapper = () => setWidth(() => wrap.current!.clientWidth);
    window.addEventListener('resize', trackingWidthWrapper);
    calculationCountElement();
    return () => {
      window.removeEventListener('resize', trackingWidthWrapper);
    };
  }, []);

  useEffect(() => {
    setCountElement(() => calculationCountElement());
  }, [wrap.current, width]);

  return (
    <div className={classes.users} ref={wrap}>
      {users.slice(0, countElement).map((user, index) => (
        <Tooltip title={`${user.task_role.name}: ${user.assign_user.name}`}>
          <UserAvatar
            key={`${user.assign_user.user_id}`}
            user={user.assign_user}
            color={colors[index]}
          />
        </Tooltip>
      ))}
      {users.length - countElement > 0 && (
        <Other count={users.length - countElement} allUsers={users} />
      )}
    </div>
  );
};

export default UserAssignedToTask;
