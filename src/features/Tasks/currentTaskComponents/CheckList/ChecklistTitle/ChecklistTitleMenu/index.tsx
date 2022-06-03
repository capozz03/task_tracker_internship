import React from 'react';
import { Dropdown, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import { TaskFormSlice } from 'store/slice';
import { EllipsisOutlined } from '@ant-design/icons';
import { TTaskCheckList } from 'store/slice/task/entities';

type CheckboxMenuProps = {
  checkList: TTaskCheckList,
  editItem: () => void,
}

const ChecklistTitleMenu = ({ checkList, editItem }: CheckboxMenuProps) => {
  const { Item } = Menu;
  const dispatch = useDispatch();
  const taskId = useSelector(TaskFormSlice.getTaskFormId);
  const detachChecklist = () => {
    dispatch(TaskFormSlice.detachChecklist({
      message: checkList.title,
      checkListId: checkList.check_list_id,
      taskId: taskId || '',
    }));
  };

  const menu = (
    <Menu className={styles.dropdownMenu}>
      <Item key="1" onClick={editItem}>
        Редактировать
      </Item>
      <Item key="2" onClick={detachChecklist} danger>
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

export default ChecklistTitleMenu;
