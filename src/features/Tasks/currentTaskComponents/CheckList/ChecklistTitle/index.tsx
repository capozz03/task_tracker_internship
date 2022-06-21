import React, { useState } from 'react';
import CheckboxIcon from 'shared/ui/icons/CheckboxIcon';
import styles from './index.module.scss';
import ChecklistTitleEditor from './ChecklistTitleEditor';
import ChecklistTitleMenu from './ChecklistTitleMenu';
import { TTaskCheckList } from 'store/slice/task/entities';

type ChecklistTitleProps = {
  checkList: TTaskCheckList,
  canChange?: boolean,
}

const ChecklistTitle = ({ checkList, canChange = false }: ChecklistTitleProps) => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const editItem = () => {
    setIsEditTitle(true);
  };
  const closeEditMessage = () => {
    setIsEditTitle(false);
  };
  return (
    <div className={styles.title}>
      <CheckboxIcon />
      <span className={styles.titleText}>
        <ChecklistTitleEditor
          title={checkList.title}
          checkListId={checkList.check_list_id}
          closeEditMessage={closeEditMessage}
          isEditing={isEditTitle}
        />
      </span>
      {
        canChange
        && (
          <ChecklistTitleMenu
            checkList={checkList}
            editItem={editItem}
            className={styles.checklistTitleMenu}
          />
        )
      }
    </div>
  );
};

export default ChecklistTitle;
