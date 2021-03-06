import React, { useState } from 'react';
import classes from './index.module.scss';
import { TUser } from 'store/slice/user/entities';

type UserAvatarProps = {
  user: TUser,
  color: string,
}

const UserAvatarForModal = ({ user, color }: UserAvatarProps) => {
  const [loaded, setLoaded] = useState(false);
  const firstLetterFirstAndLastName = user.name.split(' ').map((word) => word.charAt(0).toUpperCase()).slice(0, 2).join('');
  return (
    <div
      className={loaded ? classes.avatar : classes.no_avatar}
      data-attr={firstLetterFirstAndLastName}
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

export default UserAvatarForModal;
