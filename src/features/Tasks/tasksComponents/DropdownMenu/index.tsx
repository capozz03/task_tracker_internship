import React from 'react';
import { Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import style from './index.module.scss';
import { useDispatch } from 'react-redux';
import { deleteTaskAsync, duplicateTaskAsync } from '../../../../store/slice/task/taskInWork';

type DropdownMenuProps = {
  // eslint-disable-next-line react/require-default-props
  taskId?: string;
};

const DropdownMenu = ({ taskId }: DropdownMenuProps) => {
  const { Item } = Menu;
  const dispatch = useDispatch();

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

  const menu = (
    <Menu className={style.dropdownMenu}>
      <Item key="1" onClick={duplicateHandle}>
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
      />
    </div>
  );
};

export default DropdownMenu;
