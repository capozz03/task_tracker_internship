import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Menu, Dropdown, Input, Popover } from 'antd';
import styles from './index.module.scss';
import { searchIcons } from 'shared/ui/icons';
import Checkbox from 'features/Task/taskModalComponents/Checkbox';
import { UserAvatar } from 'features/Tasks/tasksComponents';

const { SearchInputIcon, SearchArrowIcon } = searchIcons;
const logo = 'https://avatars.mds.yandex.net/get-zen_gallery/3129491/pub_5f69bbcff52b7a1881aaf1c4_5f69bc38f52b7a1881abbfa2/scale_1200';
const logo1 = 'https://the-flow.ru/uploads/images/origin/07/54/53/13/80/5aff992.jpeg';
const logo2 = 'https://i.pinimg.com/originals/ce/ef/fa/ceeffa2be7b31e962b87b072486a8386.jpg';
const logo3 = 'https://yt3.ggpht.com/a/AATXAJznFo3gbTNfhWJr-BT6HYRkCMHlGI3XnWWG4A=s900-c-k-c0xffffffff-no-rj-mo';
const logo4 = 'https://cdn.fastcup.net/avatars/users/144667_7glool112.jpg';
const logo5 = 'https://i.pinimg.com/736x/62/e7/37/62e737890c45e4835ca93fc84156547a.jpg';

const MembersChanger = () => {
  const [value, setValue] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  const [members, setMembers] = useState([
    { user_id: 1, logo, name: 'Jack Smith', roles: { observer: false, performer: false, responsible: false } },
    { user_id: 2, logo: logo1, name: 'Dean Smith', roles: { observer: true, performer: false, responsible: false } },
    { user_id: 3, logo: logo2, name: 'Sam Smith', roles: { observer: false, performer: false, responsible: false } },
    { user_id: 4, logo: logo3, name: 'Sheldon Smith', roles: { observer: false, performer: true, responsible: false } },
    { user_id: 5, logo: logo4, name: 'Leonard Smith', roles: { observer: true, performer: false, responsible: true } },
    { user_id: 6, logo: logo5, name: 'Govard Smith', roles: { observer: false, performer: false, responsible: false } },
    { user_id: 7, name: 'Radjesh Smith', roles: { observer: false, performer: false, responsible: false } },
    { user_id: 8, name: 'Fiona Smith', roles: { observer: true, performer: true, responsible: false } },
    { user_id: 9, name: 'Shrek Smith', roles: { observer: false, performer: false, responsible: false } },
    { user_id: 10, name: 'Alex Smith', roles: { observer: false, performer: false, responsible: true } },
    { user_id: 11, name: 'Revena Smith', roles: { observer: false, performer: false, responsible: false } },
  ]);

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

  const menu = (
    <div className={styles.menuContainer}>
      <div className={styles.searchWrapper}>
        <SearchInputIcon />
        <Input value={value} onChange={inputCallback} placeholder="Искать участников" onClick={stopPropagation} />
      </div>
      <Menu triggerSubMenuAction="click" onClick={onMenuClick} className={styles.menu}>
        {
        members.filter((m) => m.name.toLowerCase().indexOf(value.toLowerCase()) !== -1).map((m) =>
          <Menu.Item key={m.user_id}>
            <Popover
              placement="rightTop"
              title={popoverTitle}
              content={() => popoverContent(m)}
              trigger="click"
              overlayClassName={styles.popup}
            >
              <div>
                <UserAvatar user={{ user_id: m.user_id, name: m.name, logo: m.logo }} color="#FF974A" />
                <span>{m.name}</span>
              </div>
              <SearchArrowIcon />
            </Popover>
          </Menu.Item>,
        )
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
      <button type="button">
        Cascading menu 2
      </button>
    </Dropdown>);
};

export default MembersChanger;
