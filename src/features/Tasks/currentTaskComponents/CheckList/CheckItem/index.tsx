import React, { useState } from 'react';
import { TTaskCheckListItem } from 'store/slice/task/entities';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import CheckboxMenu from './CheckboxMenu';
import styles from './index.module.scss';
import CheckItemMessage from './CheckitemMessage';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIcon from 'shared/ui/icons/DragIcon';
import classNames from 'classnames';

type CheckItemProps = {
  item: TTaskCheckListItem,
  checklistId: string,
  canChange?: boolean,
}

const CheckItem = ({ item, checklistId, canChange = false }: CheckItemProps) => {
  const dispatch = useDispatch();
  const onChange = (e: CheckboxChangeEvent) => {
    dispatch(TaskFormSlice.changeStatusItemForChecklist({
      checkListId: checklistId,
      checkListItemId: e.target.value,
      complete: e.target.checked,
    }));
  };
  const [isEditMessage, setIsEditMessage] = useState(false);
  const editItem = () => {
    setIsEditMessage(true);
  };
  const closeEditMessage = () => {
    setIsEditMessage(false);
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.check_list_item_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li
      className={styles.checklistItem}
      ref={setNodeRef}
      style={style}
    >
      <span
        {...attributes}
        {...listeners}
        className={classNames(styles.dragElement, { [styles.hidden]: !canChange })}
      >
        <DragIcon />
      </span>
      <Checkbox
        onChange={onChange}
        value={item.check_list_item_id}
        checked={item.complete}
        disabled={!canChange}
      >
        <CheckItemMessage
          checked={item.complete}
          message={item.message}
          checkListId={checklistId}
          checkListItemId={item.check_list_item_id}
          isEditing={isEditMessage}
          closeEditMessage={closeEditMessage}
        />
      </Checkbox>
      <div className={classNames(styles.checkBoxMenu, { [styles.hidden]: !canChange })}>
        <CheckboxMenu
          checkListItemId={item.check_list_item_id}
          checkListId={checklistId}
          editItem={editItem}
          className={styles.checkboxMenu}
        />
      </div>
    </li>);
};

export default CheckItem;
