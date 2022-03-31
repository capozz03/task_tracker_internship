import React from 'react';
import { Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import style from './index.module.scss';

export const DropdownMenu = () => {
  const menu = (
    <Menu className={style.dropdownMenu} style={{ borderRadius: '8px' }}>
      <Menu.Item key="1">
        Дублировать задачу
      </Menu.Item>
      <Menu.Item key="2">
        Переместить в архив
      </Menu.Item>
      <Menu.Item key="3" className={style.delete}>
        Удалить задачу
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown.Button
        className={style.dropdownButton}
        overlay={menu}
        icon={<EllipsisOutlined style={{ fontSize: '24px' }} />}
      />
    </div>
  );
};
