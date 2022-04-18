import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Menu, Dropdown, Checkbox, Input } from 'antd';
import styles from './index.module.scss';
import { searchIcons } from 'shared/ui/icons';

const { SubMenu } = Menu;
const { SearchInputIcon } = searchIcons;
const logo = 'https://avatars.mds.yandex.net/get-zen_gallery/3129491/pub_5f69bbcff52b7a1881aaf1c4_5f69bc38f52b7a1881abbfa2/scale_1200';

const MemberChanger = () => {
  const [value, setValue] = useState('');

  const [members, setMembers] = useState([
    { logo, name: 'Jack', roles: { observer: false, performer: false, responsible: false } },
    { logo, name: 'Dean', roles: { observer: true, performer: false, responsible: false } },
    { logo, name: 'Sam', roles: { observer: false, performer: false, responsible: false } },
    { logo, name: 'Sheldon', roles: { observer: false, performer: true, responsible: false } },
    { logo, name: 'Leonard', roles: { observer: true, performer: false, responsible: true } },
    { logo, name: 'Govard', roles: { observer: false, performer: false, responsible: false } },
    { logo, name: 'Radjesh', roles: { observer: false, performer: false, responsible: false } },
    { logo, name: 'Fiona', roles: { observer: true, performer: true, responsible: false } },
    { logo, name: 'Shrek', roles: { observer: false, performer: false, responsible: false } },
    { logo, name: 'Alex', roles: { observer: false, performer: false, responsible: true } },
    { logo, name: 'Revena', roles: { observer: false, performer: false, responsible: false } },
  ]);

  const onChange = (name: string, role: 'observer' | 'performer' | 'responsible') => {
    setMembers(members.filter((m) => {
      if (m.name === name) m.roles[role] = !m.roles[role];
      return m;
    }));
  };

  const stop = (e: any) => e.stopPropagation();
  const inputCallback = (e: any) => setValue(e.target.value);

  const user = (name: string, logo: string) => (
    <div className={styles.user}>
      <img src={logo} alt="" />
      <span>{name}</span>
    </div>
  );

  const menu = (
    <div className={styles.dropdown}>
      <div className={styles.inputWrapper}>
        <SearchInputIcon />
        <Input value={value} onChange={inputCallback} className={styles.input} onClick={stop} placeholder="Искать участников" />
      </div>
      <Menu className={styles.menu} triggerSubMenuAction="hover">
        {
        members.filter((m) => m.name.toLowerCase().indexOf(value) !== -1).map((m, index) =>
          <SubMenu title={user(m.name, m.logo)} key={`key_${index * index}`}>
            <Menu.Item>
              <Checkbox onChange={() => onChange(m.name, 'observer')} checked={m.roles.observer} onClick={stop}>
                Наблюдатель
              </Checkbox>
            </Menu.Item>
            <Menu.Item>
              <Checkbox onChange={() => onChange(m.name, 'performer')} checked={m.roles.performer} onClick={stop}>
                Исполнитель
              </Checkbox>
            </Menu.Item>
            <Menu.Item>
              <Checkbox onChange={() => onChange(m.name, 'responsible')} checked={m.roles.responsible} onClick={stop}>
                Ответственный
              </Checkbox>
            </Menu.Item>
          </SubMenu>,
        )
      }
      </Menu>
    </div>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <p className={styles.button}>
        Cascading menu
      </p>
    </Dropdown>);
};

export default MemberChanger;
