import React from 'react';
import styles from './index.module.scss';
import { Layout } from 'antd';
import FilterAssignedTo from '../tasksComponents/FilterAssignedTo';
import FilterToggleButton from '../tasksComponents/FilterToggleButton';
import { CloseOutlined } from '@ant-design/icons';
import UserAvatarMenu from '../../Auth/UserAvatarMenu';
import TasksInbox from '../tasksComponents/TasksInbox';
import TasksInWork from '../tasksComponents/TasksInWork';
import TasksCompleted from '../tasksComponents/TasksCompleted';
import TasksFailed from '../tasksComponents/TasksFailed';
import TaskModal from '../currentTaskComponents/TaskModal';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFilters, TaskFormSlice } from 'store/slice';
import FiltersPanel from '../tasksComponents/FiltersPanel';
import ModalDeleteTask from 'shared/ui/ModalDeleteTask';
import Notifications from '../../../shared/ui/Notifications';
import NotificationBell from '../tasksComponents/NotificationsBell';

const { Sider, Header, Content } = Layout;
const { getIsFiltersMenuShow, setIsFiltersMenuShow } = TaskFilters;

const TasksLayout = () => {
  const dispatch = useDispatch();
  const isSidebarShow = useSelector(getIsFiltersMenuShow);
  const changeSidebarVisibility = () => dispatch(setIsFiltersMenuShow(!isSidebarShow));
  const hideSidebar = () => dispatch(setIsFiltersMenuShow(false));
  const isVisibleForm = useSelector(TaskFormSlice.getTaskFormIsVisibleForm);
  const filtersCount = useSelector(TaskFilters.getFiltersCount);

  return (
    <>
      <Layout className={styles.layout}>
        <Sider className={styles.sider} width={250} collapsed={!isSidebarShow} collapsedWidth={0}>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <span className={styles.text}>фильтры и поиск</span>
              <CloseOutlined className={styles.close} onClick={hideSidebar} />
            </div>
            <FiltersPanel />
          </div>
        </Sider>
        <Layout className={styles.main}>
          <Header className={styles.header}>
            <div className={styles.text}>Задачи</div>
            <div className={styles.profile}>
              <div className={styles.notification}>
                <NotificationBell />
              </div>
              <UserAvatarMenu />
            </div>
            <div className={styles.tools}>
              <FilterToggleButton
                filtersCount={filtersCount}
                onClick={changeSidebarVisibility}
              />
              <NotificationBell />
            </div>
            <span className={styles.filterAssignedTo}>
              <FilterAssignedTo />
            </span>
          </Header>
          <Content className={styles.content}>
            <span className={styles.headerText}>Задачи</span>
            <TasksInbox />
            <TasksInWork />
            <TasksCompleted />
            <TasksFailed />
          </Content>
        </Layout>
      </Layout>
      <TaskModal visible={isVisibleForm} />
      <ModalDeleteTask />
      <Notifications />
    </>
  );
};

export default TasksLayout;
