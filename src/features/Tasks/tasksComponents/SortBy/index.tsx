import React from 'react';
import { Select, Menu, Dropdown } from 'antd';
import style from './index.module.scss';
import Icon, { CaretDownOutlined } from '@ant-design/icons';
import { IconShape } from './icons';

export const SortByPCScreen = () => {
  const { Option } = Select;

  return (
    <div className={style.sortByWrapper}>
      <div className={style.sortByItemTitle}>Упорядочить по:</div>
      <Select
        className={style.sortByItemSelect}
        suffixIcon={
          <CaretDownOutlined className="ant-select-suffix" style={{ color: '#92929D' }} />
        }
        defaultValue="дате создания"
        bordered={false}
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ borderRadius: '8px' }}
      >
        <Option value="дате создания">дате создания</Option>
        <Option value="дате завершения">дате завершения</Option>
      </Select>
    </div>
  );
};

export const SortByMobileScreen = () => {
  const { Item } = Menu;

  const menu = (
    <Menu className={style.dropdown}>
      <Item key="0" className={style.dropdownItem}>
        <div>Упорядочить по дате создания</div>
      </Item>
      <Item key="1" className={style.dropdownItem}>
        <div>Упорядочить по дате завершения</div>
      </Item>
    </Menu>
  );

  return (
    <div className={style.sortByWrapper}>
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <Icon component={IconShape} />
      </Dropdown>
    </div>
  );
};
