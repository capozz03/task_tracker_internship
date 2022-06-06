import React, { useEffect, useRef, useState } from 'react';
import UserAvatar from 'features/Tasks/tasksComponents/UserAvatar';
import classes from './index.module.scss';
import { TRoles } from 'store/slice/task/entities';
import { uniqBy } from 'lodash';
import { Dropdown } from 'antd';
import UserLabel from 'features/Task/taskModalComponents/UserLabel';

type UserAssignedToTaskProps = {
  users: TRoles[]
}

type TUsersLists = {
  author?: TRoles,
  performer?: TRoles,
  responsible?: TRoles,
  observers?: TRoles[],
};

const UserAssignedToTask = ({ users }: UserAssignedToTaskProps) => {
  const wrap = useRef<HTMLDivElement | null>(null);
  const [countElement, setCountElement] = useState(0);
  const [visible, setVisible] = useState(false);
  const [list] = useState<TUsersLists>({
    author: users.find((user) => user.task_role.is_author),
    performer: users.find((user) => user.task_role.name === 'Исполнитель'),
    responsible: users.find((user) => user.task_role.name === 'Ответственный'),
    observers: users.filter((user) => user.task_role.name === 'Наблюдатель'),
  });

  const [width, setWidth] = useState(0);
  const colors = ['#FFC542', '#A461D8', '#A4E3FE', '#FC5A5A', '#A461D8', '#FF9AD5', '#50B5FF'];
  let usersNew: TRoles[] = [];
  usersNew = uniqBy(users, (e) => e.assign_user.user_id);
  users = usersNew;

  const calculationCountElement = () => {
    const count = Math.floor(wrap.current!.offsetWidth / 40) - 1;
    return count + 1 < users.length ? count : users.length;
  };

  const stopPropagation = (e: any) => e.stopPropagation();

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

  const userlist = () => (
    <div
      className={classes.userlist}
      onClick={stopPropagation}
      role="button"
      aria-hidden="true"
    >
      { !!list.author
        && (
          <>
            <h4>Автор:</h4>
            <UserLabel user={{
              userId: list.author.assign_user.user_id,
              userName: list.author.assign_user.name,
              logo: list.author.assign_user.logo,
            }}
            />
          </>
        )}
      { !!list.performer
        && (
          <>
            <h4>Исполнитель:</h4>
            <UserLabel user={{
              userId: list.performer.assign_user.user_id,
              userName: list.performer.assign_user.name,
              logo: list.performer.assign_user.logo,
            }}
            />
          </>
        )}
      { !!list.responsible
        && (
          <>
            <h4>Ответственный:</h4>
            <UserLabel user={{
              userId: list.responsible.assign_user.user_id,
              userName: list.responsible.assign_user.name,
              logo: list.responsible.assign_user.logo,
            }}
            />
          </>
        )}
      { !!list.observers && list.observers.length
          && (
            <>
              <h4>Наблюдатели:</h4>
              {
                list.observers.map((user) => (
                  <UserLabel
                    user={{
                      userId: user.assign_user.user_id,
                      userName: user.assign_user.name,
                      logo: user.assign_user.logo,
                    }}
                    key={user.assign_user.user_id}
                  />
                ))
              }
            </>
          )}
    </div>
  );

  return (
    <div className={classes.users} ref={wrap}>
      {users.slice(0, countElement).map((user, index) => (
        <UserAvatar
          key={`${user.assign_user.user_id}`}
          user={user.assign_user}
          color={colors[index]}
          tooltip={`${user.task_role.name.split(' ')[0]}: ${user.assign_user.name}`}
        />
      ))}
      {
        users.length - countElement > 0
        && (
          <Dropdown
            overlay={userlist}
            trigger={['hover', 'click']}
            visible={visible}
            onVisibleChange={setVisible}
          >
            <button type="button" className={classes.othersButton} onClick={stopPropagation}>
              {`+${users.length - countElement}`}
            </button>
          </Dropdown>
        )
      }
    </div>);
};

export default UserAssignedToTask;
