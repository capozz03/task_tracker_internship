import React from 'react';
import { Dropdown, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import { TaskFormSlice } from 'store/slice';
import classNames from 'classnames';
import { DropdownMoreButton } from 'shared/ui/icons';

type CheckboxMenuProps = {
  checkListItemId: string,
  checkListId: string,
  editItem: () => void,
  className?: string,
}

const CheckboxMenu = ({ checkListItemId, checkListId, editItem, className }: CheckboxMenuProps) => {
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
      className={classNames([styles.dropdownButton, className])}
      overlay={menu}
      trigger={['click']}
      icon={<DropdownMoreButton className={styles.dropdownIcon} />}
      getPopupContainer={() => document.querySelector('.ant-modal-wrap') as HTMLElement}
    />
  );
};

export default CheckboxMenu;
