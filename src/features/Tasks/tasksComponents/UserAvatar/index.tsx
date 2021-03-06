import React, { useState } from 'react';
import classes from './index.module.scss';
import { TUser } from 'store/slice/user/entities';
import Tooltip from 'features/Tasks/tasksComponents/Tooltip';

type UserAvatarProps = {
  user: TUser,
  color: string,
  tooltip?: string,
  positionTooltip?: 'left' | 'right' | 'top' | 'bottom' | 'topLeft'
    | 'topRight' | 'bottomLeft' | 'bottomRight' | 'rightTop'
    | 'rightBottom' | 'leftTop' | 'leftBottom' | undefined
}

const UserAvatar = ({ user, color, tooltip, positionTooltip = 'bottom' }: UserAvatarProps) => {
  const [loaded, setLoaded] = useState(false);
  const firstLetterFirstAndLastName = user.name.split(' ').map((word) => word.charAt(0).toUpperCase()).slice(0, 2).join('');
  return (
    <Tooltip
      title={tooltip || user.name}
      placement={positionTooltip}
      ignoreTouchDevice
    >
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
    </Tooltip>
  );
};

export default UserAvatar;
