import React from 'react';
import { Select, Menu, Dropdown } from 'antd';
import style from './index.module.scss';
import Icon, { CaretDownOutlined } from '@ant-design/icons';
import { TSortType } from 'store/slice/task/entities';
import { IconShape } from 'shared/ui/icons/TasksIcons';

type SetSortTypeProps = {
  setSortType: React.Dispatch<React.SetStateAction<TSortType>>;
};

export const SortByPCScreen = ({ setSortType }: SetSortTypeProps) => {
  const { Option } = Select;

  const sortHandler = (value: TSortType): void => {
    setSortType(value);
  };

  return (
    <div className={style.sortByWrapper}>
      <div className={style.sortByItemTitle}>Упорядочить по:</div>
      <Select
        className={style.sortByItemSelect}
        suffixIcon={
          <CaretDownOutlined className="ant-select-suffix" style={{ color: '#92929D' }} />
        }
        defaultValue="date~DESC"
        bordered={false}
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ borderRadius: '8px' }}
        onChange={sortHandler}
      >
        <Option value="date~DESC">дате создания</Option>
        <Option value="title~ASC">наименованию</Option>
      </Select>
    </div>
  );
};

export const SortByMobileScreen = ({ setSortType }: SetSortTypeProps) => {
  const { Item } = Menu;
  const sortHandler = ({ key }: any): void => {
    setSortType(key);
  };

  const menu = (
    <Menu className={style.dropdown} onClick={sortHandler}>
      <Item key="date~DESC" className={style.dropdownItem}>
        <div>Упорядочить по дате создания</div>
      </Item>
      <Item key="title~ASC" className={style.dropdownItem}>
        <div>Упорядочить по наименованию</div>
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
