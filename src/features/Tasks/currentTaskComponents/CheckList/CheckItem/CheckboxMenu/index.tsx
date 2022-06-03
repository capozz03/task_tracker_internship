import React from 'react';
import { Dropdown, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import { TaskFormSlice } from 'store/slice';
import { EllipsisOutlined } from '@ant-design/icons';

type CheckboxMenuProps = {
  checkListItemId: string,
  checkListId: string,
  editItem: () => void,
}

const CheckboxMenu = ({ checkListItemId, checkListId, editItem }: CheckboxMenuProps) => {
  const { Item } = Menu;
  const dispatch = useDispatch();
  const deleteItem = () => {
    dispatch(TaskFormSlice.deleteItemForChecklist({
      checkListItemId,
      checkListId,
    }));
  };

  const menu = (
    <Menu className={styles.dropdownMenu}>
      <Item key="1" onClick={editItem}>
        Редактировать
      </Item>
      <Item key="2" onClick={deleteItem} danger>
        Удалить
      </Item>
    </Menu>
  );

  return (
    <Dropdown.Button
      className={styles.dropdownButton}
      overlay={menu}
      trigger={['click']}
      getPopupContainer={() => document.querySelector('.ant-modal-wrap') as HTMLElement}
      icon={<EllipsisOutlined className={styles.dropdownIcon} />}
    />
  );
};

export default CheckboxMenu;
