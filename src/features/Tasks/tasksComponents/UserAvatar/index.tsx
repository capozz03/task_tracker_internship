import React, { useState } from 'react';
import classes from './index.module.scss';

type UserProps = {
  name: string,
  logo?: string
}

type UserAvatarProps = {
  user: UserProps
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  const [loaded, setLoaded] = useState(false);
  const abbr = user.name.split(' ').map((word) => word.charAt(0).toUpperCase()).join('');
  return (
    <div
      className={loaded ? classes.avatar : classes.no_avatar}
      data-attr={abbr}
      title={user.name}
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
