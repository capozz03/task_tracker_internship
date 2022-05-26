import React, { useState } from 'react';
import { Select, Menu, Dropdown } from 'antd';
import style from './index.module.scss';
import Icon, { CaretDownOutlined } from '@ant-design/icons';
import { TSortType } from 'store/slice/task/entities';
import { IconShape } from 'shared/ui/icons/TasksIcons';
import classnames from 'classnames';

type SetSortTypeProps = {
  setSortType: React.Dispatch<React.SetStateAction<TSortType>>;
  disabled: boolean;
};

export const SortByPCScreen = ({ setSortType, disabled }: SetSortTypeProps) => {
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
        disabled={disabled}
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

export const SortByMobileScreen = ({ setSortType, disabled }: SetSortTypeProps) => {
  const { Item } = Menu;
  const [isActiveSort, setIsActiveSort] = useState({
    isDate: true,
    isTitle: false,
  });
  const sortHandler = ({ key }: any): void => {
    setSortType(key);
    if (key === 'date~DESC') {
      setIsActiveSort({
        isDate: true,
        isTitle: false,
      });
    } else {
      setIsActiveSort({
        isDate: false,
        isTitle: true,
      });
    }
  };

  const menu = (
    <Menu className={style.dropdown} onClick={sortHandler}>
      <Item key="date~DESC" className={classnames([style.dropdownItem, isActiveSort.isDate && style.activeSort])}>
        <div>Упорядочить по дате создания</div>
      </Item>
      <Item key="title~ASC" className={classnames([style.dropdownItem, isActiveSort.isTitle && style.activeSort])}>
        <div>Упорядочить по наименованию</div>
      </Item>
    </Menu>
  );

  return (
    <div className={style.sortByWrapper}>
      <Dropdown disabled={disabled} overlay={menu} trigger={['click']} placement="bottomRight">
        <Icon component={IconShape} />
      </Dropdown>
    </div>
  );
};
