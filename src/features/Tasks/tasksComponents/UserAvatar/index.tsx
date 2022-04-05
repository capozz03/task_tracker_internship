import React, { useState } from 'react';
import classes from './index.module.scss';
import { TUser } from 'store/slice/user/entities';

type UserAvatarProps = {
  user: TUser,
  color: string
}

const UserAvatar = ({ user, color }: UserAvatarProps) => {
  const [loaded, setLoaded] = useState(false);
  const abbr = user.name.split(' ').map((word) => word.charAt(0).toUpperCase()).join('');
  return (
    <div
      className={loaded ? classes.avatar : classes.no_avatar}
      data-attr={abbr}
      title={user.name}
      style={{
        backgroundColor: `${color}`,
      }}
    >
      <img
        onLoad={() => setLoaded(true)}
        src={user.logo}
        alt={`Аватарка пользователя: ${user.name}`}
      />
    </div>
  );
};

export default UserAvatar;
