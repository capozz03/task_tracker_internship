import React from 'react';
import { Dropdown, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
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
  const task = useSelector(TaskFormSlice.getTask);
  const dispatch = useDispatch();
  if (task) {
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
        icon={<EllipsisOutlined className={styles.dropdownIcon} />}
      />
    );
  }
  return (
    <div>Ошибка, задача не выбрана</div>
  );
};

export default CheckboxMenu;
