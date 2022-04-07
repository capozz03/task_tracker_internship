import React, { useState } from 'react';
import styles from './index.module.scss';
import { Layout } from 'antd';
import FilterAssignedTo from '../tasksComponents/FilterAssignedTo';
import SidebarSearchInput from '../tasksComponents/SidebarSearchInput';
import Profile from '../tasksComponents/Profile';
import NotificationsButton from '../tasksComponents/NotificationsButton';
import FilterToggleButton from '../tasksComponents/FilterToggleButton';
import { CloseOutlined } from '@ant-design/icons';
import { CardsCompleted } from '../tasksComponents/CardsCompleted';

const { Sider, Header, Content } = Layout;

const TasksLayout = () => {
  const [sidebarShow, setSidebarShow] = useState(false);

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider} width={250} collapsed={!sidebarShow} collapsedWidth={0}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <span className={styles.text}>фильтры и поиск</span>
            <CloseOutlined className={styles.close} onClick={() => setSidebarShow(false)} />
          </div>
          <SidebarSearchInput placeholder="Поиск" />
        </div>
      </Sider>
      <Layout className={styles.main}>
        <Header className={styles.header}>
          <div className={styles.text}>Задачи</div>
          <Profile className={styles.profile} />
          <div className={styles.tools}>
            <FilterToggleButton
              active={sidebarShow}
              filtersCount={1}
              onClick={() => setSidebarShow(!sidebarShow)}
            />
            <NotificationsButton active={false} />
          </div>
          <span className={styles.filterAssignedTo}>
            <FilterAssignedTo currentValue="all" />
          </span>
        </Header>
        <Content className={styles.content}>
          <span className={styles.headerText}>Задачи</span>

          <CardsCompleted />
        </Content>
      </Layout>
    </Layout>
  );
};

export default TasksLayout;
