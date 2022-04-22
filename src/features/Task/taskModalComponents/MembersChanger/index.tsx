/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersList, getUsersListPage, usersListPagination, resetUserList, loadingStatus } from 'store/slice/users';
import { alert } from 'shared/ui';

import { searchIcons } from 'shared/ui/icons';
import Checkbox from 'features/Task/taskModalComponents/Checkbox';
import { UserAvatar } from 'features/Tasks/tasksComponents';

import { Menu, Dropdown, Input, Popover, Spin } from 'antd';
import 'antd/dist/antd.css';
import styles from './index.module.scss';

import { InView } from 'react-intersection-observer';
import { RequestStatuses } from 'shared';

// remove
type TMember = {
  name: string;
  logo?: string;
  user_id: string;
  permissions?: any;
  roles: {
    observer: boolean;
    performer: boolean;
    responsible: boolean;
  }
}

const { SearchInputIcon, SearchArrowIcon } = searchIcons;

const MembersChanger = () => {
  const [value, setValue] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [members, setMembers] = useState<TMember[]>([]);
  const [timer, setTimer] = useState<any>();

  const dispatch = useDispatch();
  const users = useSelector(usersList);
  const pagination = useSelector(usersListPagination);
  const isLoading = useSelector(loadingStatus);

  const lastElement = useRef(null);
  const menuElement = useRef(null);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    dispatch(resetUserList());
    dispatch(getUsersListPage({ page: 1, limit: 10, search: value }));
    alert(`Загружена страница ${1}`);
  }, []);

  useEffect(() => {
    setMembers(users?.map((user) => ({
      ...user, roles: { observer: false, performer: false, responsible: false },
    })) || []);
  }, [users]);

  useEffect(() => {
    dispatch(resetUserList());
    clearTimeout(timer);
    setTimer(setTimeout(
      () => dispatch(getUsersListPage({ page: 1, limit: 10, search: value })),
      200,
    ));
  }, [value]);

  const onChange = (name: string, role: 'observer' | 'performer' | 'responsible') => {
    setMembers(members.filter((m) => {
      if (m.name === name) m.roles[role] = !m.roles[role];
      return m;
    }));
  };

  const stopPropagation = (e: any) => e.stopPropagation();
  const inputCallback = (e: any) => setValue(e.target.value);
  const onVisibleChange = (flag: boolean) => setVisible(flag);
  const onMenuClick = () => setVisible(true);

  const onViewChanged = (inView: boolean, entry: IntersectionObserverEntry) => {
    if (inView && entry.isIntersecting) {
      if (pagination) {
        const { page_current: current, per_page: limit } = pagination;
        if (current < pagination.page_total) {
          dispatch(getUsersListPage({ page: current + 1, limit, search: value }));
          alert(`Загружена страница ${current + 1}`);
        }
      }
    }
  };

  const popoverTitle = 'Роли участника:';
  const popoverContent = (m: any) => (
    <div className={styles.popupCheckboxes}>
      <Checkbox onChange={() => onChange(m.name, 'observer')} checked={m.roles.observer}>
        Наблюдатель
      </Checkbox>
      <Checkbox onChange={() => onChange(m.name, 'performer')} checked={m.roles.performer}>
        Исполнитель
      </Checkbox>
      <Checkbox onChange={() => onChange(m.name, 'responsible')} checked={m.roles.responsible}>
        Ответственный
      </Checkbox>
    </div>
  );

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
        members.filter((m) => m.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
          .map((m, index) =>
            <Menu.Item key={`${index * index}-${m.user_id}`}>
              <Popover
                placement="rightTop"
                title={popoverTitle}
                content={() => popoverContent(m)}
                trigger="click"
                overlayClassName={styles.popup}
              >
                <div>
                  <UserAvatar user={{ user_id: m.user_id, name: m.name, logo: m.logo }} color="#FF974A" />
                  <span>
                    {m.name}
                  </span>
                </div>
                <SearchArrowIcon />
              </Popover>
            </Menu.Item>,
          )
        }
        {
          observerElement()
        }
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
      <button type="button" style={{ display: 'block', margin: '10px 0' }}>
        Users
      </button>
    </Dropdown>);
};

export default MembersChanger;
