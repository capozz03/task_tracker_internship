import React from 'react';
import { Dropdown, Menu, MenuProps } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import style from './index.module.scss';

export const DropdownMenu = (props: MenuProps) => {
  const { Item } = Menu;

  const menu = (
    <Menu className={style.dropdownMenu} {...props}>
      <Item key="1">Дублировать задачу</Item>
      <Item key="2">Переместить в архив</Item>
      <Item key="3" className={style.delete}>
        Удалить задачу
      </Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown.Button
        className={style.dropdownButton}
        overlay={menu}
        icon={<EllipsisOutlined className={style.dropdownIcon} />}
      />
    </div>
  );
};
