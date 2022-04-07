import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, userInfo } from 'store/slice/user';
import { Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import UserAvatar from 'features/Tasks/tasksComponents/UserAvatar';
import styles from './index.module.scss';

const UserAvatarMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const info = useSelector(userInfo) || { user_id: 0, name: 'Unknown User' };

  const logoutAction = () => {
    dispatch(logoutUser());
    navigate('/auth');
  };

  const menu = (
    <Menu>
      <Menu.Item key={0}>
        <button className={styles.btn} type="button" onClick={logoutAction}>Выйти</button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} overlayClassName={styles.dropdown}>
      <div className={styles.wrapper}>
        <UserAvatar user={info} color="#FFC542" />
        <CaretDownOutlined className={styles.icon} />
      </div>
    </Dropdown>
  );
};

export default UserAvatarMenu;
