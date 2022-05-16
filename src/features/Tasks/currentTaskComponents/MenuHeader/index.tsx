import React from 'react';
import AttachMenu from './AttachMenu';
import Subscribes from './Subscribes';
import styles from './index.module.scss';

const MenuHeader = () => (
  <div className={styles.wrap}>
    <AttachMenu />
    <Subscribes />
  </div>
);

export default MenuHeader;
