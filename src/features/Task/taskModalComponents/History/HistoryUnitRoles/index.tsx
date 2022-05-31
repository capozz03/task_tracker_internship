import { UserAvatar } from 'features/Tasks/tasksComponents';
import React from 'react';
import { TUser } from 'store/slice/user/entities';

type TProps = {
  user: TUser | null;
  role: string;
}

const HistoryUnitRoles = ({ user, role }: TProps) => {
  if (!user) user = { user_id: '0', name: 'Пользователь не найден' };

  return (
    <div>
      <UserAvatar user={user} color="#C3AEFF" />
      <span>{user.name}</span>
      {' - '}
      <span>{role}</span>
    </div>
  );
}

export default HistoryUnitRoles;
