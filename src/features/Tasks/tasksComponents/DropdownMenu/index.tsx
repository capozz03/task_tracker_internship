import React, { MouseEventHandler } from 'react';
import { Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import style from './index.module.scss';
import { useDispatch } from 'react-redux';
import { deleteTaskAsync, duplicateTaskAsync } from '../../../../store/slice/task/taskInWork';
import { getTaskByIdAsync } from 'store/slice/task/taskForm';

type DropdownMenuProps = {
  // eslint-disable-next-line react/require-default-props
  taskId?: string;
};

const DropdownMenu = ({ taskId }: DropdownMenuProps) => {
  const { Item } = Menu;
  const dispatch = useDispatch();

  const openTask = () => {
    if (taskId) {
      dispatch(getTaskByIdAsync(taskId));
    }
  };
  const duplicateHandle = () => {
    if (taskId) {
      dispatch(duplicateTaskAsync(taskId));
    }
  };
  const deleteTaskHandle = () => {
    if (taskId) {
      dispatch(deleteTaskAsync(taskId));
    }
  };

  const onClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
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
    <div>
      <Dropdown.Button
        className={style.dropdownButton}
        overlay={menu}
        icon={<EllipsisOutlined className={style.dropdownIcon} />}
        destroyPopupOnHide
        onClick={onClick}
      />
    </div>
  );
};

export default DropdownMenu;
