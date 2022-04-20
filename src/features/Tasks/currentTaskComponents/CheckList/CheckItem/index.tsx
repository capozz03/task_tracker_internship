import React from 'react';
import { TTaskCheckListItem } from 'store/slice/task/entities';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import CheckboxMenu from './CheckboxMenu';
import styles from './index.module.scss';

type CheckItemProps = {
  item: TTaskCheckListItem,
  checklistId: string,
}

const CheckItem = ({ item, checklistId }: CheckItemProps) => {
  const dispatch = useDispatch();
  const onChange = (e: CheckboxChangeEvent) => {
    dispatch(TaskFormSlice.changeStatusItemForChecklist({
      checkListId: checklistId,
      checkListItemId: e.target.value,
      complete: e.target.checked,
    }));
  };
  return (
    <li className={styles.checklistItem}>
      <Checkbox
        onChange={onChange}
        value={item.check_list_item_id}
        checked={item.complete}
      >
        {item.message}
      </Checkbox>
      <CheckboxMenu checkListItemId={item.check_list_item_id} checkListId={checklistId} />
    </li>);
};

export default CheckItem;
