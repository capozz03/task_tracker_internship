import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import style from './index.module.scss';
import { useDispatch } from 'react-redux';
import { duplicateTaskAsync, deleteTaskAsync } from '../../../../store/slice/task/taskInWork';
import ModalTask from 'features/Task/currentTaskComponents/ModalTask';

type DropdownMenuProps = {
  // eslint-disable-next-line react/require-default-props
  taskId?: string
}

const DropdownMenu = ({ taskId }: DropdownMenuProps) => {
  const { Item } = Menu;
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
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

  const menu = (
    <Menu className={style.dropdownMenu}>
      <Item key="1" onClick={showModal}>Открыть задачу</Item>
      <Item key="2" onClick={duplicateHandle}>Дублировать задачу</Item>
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
      <ModalTask isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </div>
  );
};

export default DropdownMenu;
