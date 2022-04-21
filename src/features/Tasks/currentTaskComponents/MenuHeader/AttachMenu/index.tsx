import React from 'react';
import { Dropdown, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import { TaskFormSlice } from 'store/slice';
import PlusIcons from 'shared/ui/icons/PlusIcons';

const AttachMenu = () => {
  const dispatch = useDispatch();
  const { Item } = Menu;
  const task = useSelector(TaskFormSlice.getTask);
  if (task) {
    const checklistHandle = () => {
      dispatch(TaskFormSlice.showFormCreateChecklist());
    };
    const attachFileHandle = () => {

    };

    const menu = (
      <Menu className={styles.dropdownMenu}>
        <Item key="1" onClick={checklistHandle}>
          Добавить чек-лист
        </Item>
        <Item key="2" onClick={attachFileHandle}>
          Прикрепить вложение
        </Item>
      </Menu>
    );

    return (
      <Dropdown.Button
        className={styles.dropdownButton}
        overlay={menu}
        trigger={['click']}
        icon={<PlusIcons />}
      />
    );
  }
  return (
    <div>Ошибка, задача не выбрана</div>
  );
};

export default AttachMenu;
