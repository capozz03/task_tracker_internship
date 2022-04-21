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

const { Item } = Menu;

const OptionMenu = ({ editItem, deleteItem }: any) => (
  <Menu className={styles.dropdownMenu}>
    <Item key="1" onClick={editItem}>
      Редактировать
    </Item>
    <Item key="2" onClick={deleteItem} danger>
      Удалить
    </Item>
  </Menu>
);

const CheckboxMenu = ({ checkListItemId, checkListId, editItem }: CheckboxMenuProps) => {
  const dispatch = useDispatch();
  const deleteItem = () => {
    dispatch(TaskFormSlice.deleteItemForChecklist({
      checkListItemId,
      checkListId,
    }));
  };
  return (
    <Dropdown.Button
      className={styles.dropdownButton}
      overlay={<OptionMenu editItem={editItem} deleteItem={deleteItem} />}
      trigger={['click']}
      icon={<EllipsisOutlined className={styles.dropdownIcon} />}
    />
  );
};

export default CheckboxMenu;
