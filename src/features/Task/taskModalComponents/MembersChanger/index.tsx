/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersList, getUsersListPage, usersListPagination, resetUserList, loadingStatus } from 'store/slice/users';

import { searchIcons } from 'shared/ui/icons';
import { UserAvatar } from 'features/Tasks/tasksComponents';

import { Menu, Dropdown, Input, Spin } from 'antd';
import 'antd/dist/antd.css';
import styles from './index.module.scss';

import { InView } from 'react-intersection-observer';
import { RequestStatuses, useDebounce } from 'shared';

import MemberChangerPopover from './Popover';
import { TUser } from 'store/slice/user/entities';
import { TaskFormSlice } from 'store/slice';

const { SearchInputIcon, SearchArrowIcon } = searchIcons;

const MembersChanger = () => {
  const [value, setValue] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [members, setMembers] = useState<TUser[]>([]);
  const debouncedValue = useDebounce(value, 500);

  const dispatch = useDispatch();
  const users = useSelector(usersList);
  const roles = useSelector(TaskFormSlice.getTaskFormRoles);
  const pagination = useSelector(usersListPagination);
  const isLoading = useSelector(loadingStatus);

  useEffect(() => {
    if (users) {
      setMembers(users.filter(
        (user) => roles?.filter(
          (member) => member.assign_user.user_id === user.user_id
            && !member.task_role.is_author).length === 0));
    }
  }, [users, roles]);

  useEffect(() => {
    dispatch(resetUserList());
    dispatch(getUsersListPage({
      page: 1,
      limit: pagination?.per_page || 20,
      search: debouncedValue,
    }));
  }, [debouncedValue]);

  const stopPropagation = (e: any) => e.stopPropagation();
  const inputCallback = (e: any) => setValue(e.target.value);
  const onVisibleChange = (flag: boolean) => setVisible(flag);
  const onMenuClick = () => setVisible(true);

  const onViewChanged = (inView: boolean, entry: IntersectionObserverEntry) => {
    if (inView && entry.isIntersecting) {
      if (pagination) {
        const { page_current: current, per_page: limit } = pagination;
        if (current < pagination.page_total) {
          dispatch(getUsersListPage({ page: current + 1, limit, search: debouncedValue }));
        }
      }
    }
  };

  const observerElement = () => (
    <InView threshold={0} onChange={onViewChanged}>
      {({ ref }) => (
        <>
          <li className={styles.lastElement} ref={ref} key="_observer_point" />
          { isLoading === RequestStatuses.LOADING && <Spin className={styles.spin} /> }
        </>
      )}
    </InView>
  );

  const menu = (
    <div className={styles.menuContainer}>
      <div className={styles.searchWrapper}>
        <SearchInputIcon />
        <Input value={value} onChange={inputCallback} placeholder="Искать участников" onClick={stopPropagation} />
      </div>
      <Menu triggerSubMenuAction="click" onClick={onMenuClick} className={styles.menu}>
        {
        members.map((m, index) =>
          <Menu.Item key={`${index * index}-${m.user_id}`}>
            <MemberChangerPopover member={m}>
              <div>
                <UserAvatar user={{ user_id: m.user_id, name: m.name, logo: m.logo }} color="#FF974A" />
                <span>
                  {m.name}
                </span>
              </div>
              <SearchArrowIcon />
            </MemberChangerPopover>
          </Menu.Item>)
        }
        { observerElement() }
      </Menu>
    </div>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      visible={visible}
      onVisibleChange={onVisibleChange}
    >
      <button type="button">Users</button>
    </Dropdown>);
};

export default MembersChanger;
