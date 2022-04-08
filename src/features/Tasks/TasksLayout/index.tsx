import React, { useState } from 'react';
import styles from './index.module.scss';
import { Layout } from 'antd';
import FilterAssignedTo from '../tasksComponents/FilterAssignedTo';
import SidebarSearchInput from '../tasksComponents/SidebarSearchInput';
import NotificationsButton from '../tasksComponents/NotificationsButton';
import FilterToggleButton from '../tasksComponents/FilterToggleButton';
import { CloseOutlined } from '@ant-design/icons';
import CardsCompleted from '../tasksComponents/CardsCompleted';
import UserAvatarMenu from '../../Auth/UserAvatarMenu';
import TasksInWork from '../tasksComponents/TasksInWork';
import TasksInbox from '../tasksComponents/TasksInbox';

const { Sider, Header, Content } = Layout;

const TasksLayout = () => {
  const [isSidebarShow, setIsSidebarShow] = useState(false);
  const changeSidebarVisibility = () => setIsSidebarShow(!isSidebarShow);
  const hideSidebar = () => setIsSidebarShow(false);

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider} width={250} collapsed={!isSidebarShow} collapsedWidth={0}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <span className={styles.text}>фильтры и поиск</span>
            <CloseOutlined className={styles.close} onClick={hideSidebar} />
          </div>
          <SidebarSearchInput placeholder="Поиск" />
        </div>
      </Sider>
      <Layout className={styles.main}>
        <Header className={styles.header}>
          <div className={styles.text}>Задачи</div>
          <div className={styles.profile}>
            <UserAvatarMenu />
          </div>
          <div className={styles.tools}>
            <FilterToggleButton
              active={isSidebarShow}
              filtersCount={1}
              onClick={changeSidebarVisibility}
            />
            <NotificationsButton active={false} />
          </div>
          <span className={styles.filterAssignedTo}>
            <FilterAssignedTo currentValue="all" />
          </span>
        </Header>
        <Content className={styles.content}>
          <span className={styles.headerText}>Задачи</span>
          <TasksInbox />
          <TasksInWork />
          <CardsCompleted />
        </Content>
      </Layout>
    </Layout>
  );
};

export default TasksLayout;
