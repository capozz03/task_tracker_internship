import React from 'react';
import styles from '../../TasksLayout/index.module.scss';
import { Avatar, Dropdown } from 'antd';
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import { menu } from './ProfileDropdownMenu';

const Profile = () => (
  <div className={styles.profile}>
    <Avatar size={34} icon={<UserOutlined />} />
    <Dropdown overlay={menu} trigger={['click']}>
      <CaretDownOutlined />
    </Dropdown>
  </div>
);

export default Profile;
