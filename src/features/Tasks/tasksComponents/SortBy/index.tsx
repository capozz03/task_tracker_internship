import React, { useState } from 'react';
import { Select, Menu, Dropdown, MenuProps } from 'antd';
import style from './index.module.scss';
import Icon, { CaretDownOutlined } from '@ant-design/icons';
import { TSortType } from 'store/slice/task/entities';
import { IconShape } from 'shared/ui/icons/TasksIcons';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { ActionCreatorWithOptionalPayload } from '@reduxjs/toolkit';

type SetSortTypePropsPC = {
  disabled: boolean;
  sortType: TSortType | undefined;
  setSortTasks: ActionCreatorWithOptionalPayload<TSortType | undefined, string>;
};

type SetSortTypePropsMobile = {
  disabled: boolean;
  setSortTasks: ActionCreatorWithOptionalPayload<TSortType | undefined, string>;
};

const { Item } = Menu;
const { Option } = Select;

export const SortByPCScreen = ({
  disabled,
  sortType,
  setSortTasks,
}: SetSortTypePropsPC) => {
  const dispatch = useDispatch();
  const sortHandler = (value: TSortType) => {
    dispatch(setSortTasks(value));
  };

  return (
    <div className={style.sortByWrapper}>
      <div className={style.sortByItemTitle}>Упорядочить по:</div>
      <Select
        getPopupContainer={() => document.querySelector('.ant-layout') as HTMLElement}
        className={style.sortByItemSelect}
        suffixIcon={
          <CaretDownOutlined className="ant-select-suffix" style={{ color: '#92929D' }} />
        }
        disabled={disabled}
        defaultValue={sortType}
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

export const SortByMobileScreen = ({ disabled, setSortTasks }: SetSortTypePropsMobile) => {
  const dispatch = useDispatch();
  const [isActiveSort, setIsActiveSort] = useState({
    isDate: true,
    isTitle: false,
  });
  const sortHandler: MenuProps['onClick'] = ({ key }) => {
    if (key === 'date~DESC') {
      setIsActiveSort({
        isDate: true,
        isTitle: false,
      });
      return dispatch(setSortTasks(key));
    }
    if (key === 'title~ASC') {
      setIsActiveSort({
        isDate: false,
        isTitle: true,
      });
      return dispatch(setSortTasks(key));
    }
  };

  const menu = (
    <Menu className={style.dropdown} onClick={sortHandler}>
      <Item
        key="date~DESC"
        className={classnames([style.dropdownItem, isActiveSort.isDate && style.activeSort])}
      >
        <div>Упорядочить по дате создания</div>
      </Item>
      <Item
        key="title~ASC"
        className={classnames([style.dropdownItem, isActiveSort.isTitle && style.activeSort])}
      >
        <div>Упорядочить по наименованию</div>
      </Item>
    </Menu>
  );

  return (
    <div className={style.sortByWrapper}>
      <Dropdown disabled={disabled} overlay={menu} trigger={['click']} placement="bottomRight" getPopupContainer={() => document.querySelector('.ant-layout') as HTMLElement}>
        <Icon component={IconShape} />
      </Dropdown>
    </div>
  );
};
