import React from 'react';
import { Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import style from './index.module.scss';
import { useDispatch } from 'react-redux';
import { CommonActions } from 'store/slice';
import { getTaskByIdAsync } from 'store/slice/task/taskForm';

type DropdownMenuProps = {
  // eslint-disable-next-line react/require-default-props
  taskId?: string;
  taskStatusId: string;
};

const DropdownMenu = ({ taskId, taskStatusId }: DropdownMenuProps) => {
  const { Item } = Menu;
  const dispatch = useDispatch();

  const openTask = () => {
    if (taskId) {
      dispatch(getTaskByIdAsync(taskId));
    }
  };
  const duplicateHandle = () => {
    if (taskId) {
      dispatch(
        CommonActions.duplicateTaskAsync({
          data: {
            taskId,
            taskStatusId,
          },
        }),
      );
    }
  };
  const deleteTaskHandle = () => {
    if (taskId) {
      dispatch(
        CommonActions.deleteTaskAsync({
          data: {
            taskId,
            taskStatusId,
          },
        }),
      );
    }
  };

  const menu = (
    <Menu className={style.dropdownMenu}>
      <Item key="1" onClick={openTask}>
        Открыть задачу
      </Item>
      <Item key="2" onClick={duplicateHandle}>
        Дублировать задачу
      </Item>
      <Item key="3" onClick={deleteTaskHandle} className={style.delete}>
        Удалить задачу
      </Item>
    </Menu>
  );

  return (
    <Dropdown.Button
      className={style.dropdownButton}
      overlay={menu}
      icon={<EllipsisOutlined className={style.dropdownIcon} />}
      destroyPopupOnHide
      trigger={['click']}
    />
  );
};

export default DropdownMenu;
