import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, userInfo, getUserInfoAsync, userId } from 'store/slice/user';
import { Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import UserAvatar from 'features/Tasks/tasksComponents/UserAvatar';
import styles from './index.module.scss';
import { TaskFilters } from 'store/slice';

const UserAvatarMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const info = useSelector(userInfo);
  const id = useSelector(userId);

  useEffect(() => {
    if (!info && id) {
      dispatch(getUserInfoAsync(id));
    }
  }, []);

  const logoutAction = () => {
    dispatch(TaskFilters.resetFilters());
    dispatch(logoutUser());
    navigate('/auth');
  };

  const menu = (
    <Menu>
      <Menu.Item key={0}>
        <button className={styles.btn} type="button" onClick={logoutAction}>
          Выйти
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} overlayClassName={styles.dropdown}>
      <div className={styles.wrapper}>
        <UserAvatar user={info || { user_id: '0', name: 'Unknown User' }} color="#FFC542" />
        <CaretDownOutlined className={styles.icon} />
      </div>
    </Dropdown>
  );
};

export default UserAvatarMenu;
