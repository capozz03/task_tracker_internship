/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './index.module.scss';
import { Layout } from 'antd';
import FilterAssignedTo from '../tasksComponents/FilterAssignedTo';
import SidebarSearchInput from '../tasksComponents/SidebarSearchInput';
import Profile from '../tasksComponents/Profile';

const { Sider, Header, Content } = Layout;

type TasksLayoutProps = {
  children: React.ReactNode;
};

const TasksLayout = ({ children }: TasksLayoutProps) => (
  <Layout className={styles.layout}>
    <Sider className={styles.sider}>
      <div className={styles.wrapper}>
        <SidebarSearchInput placeholder="Поиск" />
      </div>
    </Sider>
    <Layout className={styles.main}>
      <Profile className={styles.profile} />
      <Header className={styles.header}>
        <div className={styles.text}>Задачи</div>
        <FilterAssignedTo currentValue="all" />
      </Header>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  </Layout>
);

export default TasksLayout;
