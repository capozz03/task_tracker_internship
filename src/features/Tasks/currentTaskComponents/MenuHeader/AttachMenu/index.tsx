import React from 'react';
import { Dropdown, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import { TaskFormSlice } from 'store/slice';
import PlusIcons from 'shared/ui/icons/PlusIcons';
import { alert } from 'shared';

const AttachMenu = () => {
  const dispatch = useDispatch();
  const { Item } = Menu;
  const checklists = useSelector(TaskFormSlice.getCheckLists);
  const checklistHandle = () => {
    if (checklists && checklists.length >= 3) {
      alert('В задаче не может быть более 3-х чеклистов', 'error');
    } else {
      dispatch(TaskFormSlice.showFormCreateChecklist());
    }
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
};

export default AttachMenu;
