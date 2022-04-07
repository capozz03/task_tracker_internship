import React, { useState } from 'react';
import styles from './index.module.scss';
import { Layout } from 'antd';
import FilterAssignedTo from '../tasksComponents/FilterAssignedTo';
import SidebarSearchInput from '../tasksComponents/SidebarSearchInput';
import Profile from '../tasksComponents/Profile';
import NotificationsButton from '../tasksComponents/NotificationsButton';
import FilterToggleButton from '../tasksComponents/FilterToggleButton';

const { Sider, Header, Content } = Layout;

type TasksLayoutProps = {
  children: React.ReactNode;
};

const TasksLayout = ({ children }: TasksLayoutProps) => {
  const [sidebarShow, setSidebarShow] = useState(false);

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider} collapsed={!sidebarShow} collapsedWidth={0}>
        <div className={styles.wrapper}>
          <SidebarSearchInput placeholder="Поиск" />
        </div>
      </Sider>
      <Layout className={styles.main}>
        <Header className={styles.header}>
          <div className={styles.text}>Задачи</div>
          <Profile className={styles.profile} />
          <div className={styles.tools}>
            <FilterToggleButton
              active={false}
              onClick={() => setSidebarShow(!sidebarShow)}
            />
            <NotificationsButton active={false} />
          </div>
          <FilterAssignedTo currentValue="all" />
        </Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default TasksLayout;
