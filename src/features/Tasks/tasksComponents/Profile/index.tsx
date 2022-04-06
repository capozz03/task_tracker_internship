import React from 'react';
import styles from './index.module.scss';
import { Avatar, Dropdown } from 'antd';
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import { menu } from './ProfileDropdownMenu';

// @ts-ignore
// eslint-disable-next-line react/prop-types
const Profile = ({ className }) => (
  <div className={className}>
    <Avatar size={34} icon={<UserOutlined />} className={styles.profileAvatar} />
    <Dropdown overlay={menu} trigger={['click']}>
      <CaretDownOutlined />
    </Dropdown>
  </div>
);

export default Profile;
