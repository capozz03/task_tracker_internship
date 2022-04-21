import React from 'react';
import { TTaskCheckList } from 'store/slice/task/entities';
import CheckItem from 'features/Tasks/currentTaskComponents/CheckList/CheckItem';
import ChecklistTitle from 'features/Tasks/currentTaskComponents/CheckList/ChecklistTitle';
import ChecklistProgress from 'features/Tasks/currentTaskComponents/CheckList/ChecklistProgress';
import styles from './index.module.scss';
import NewItem from 'features/Tasks/currentTaskComponents/CheckList/NewItem';

type ChecklistProps = {
  checklist: TTaskCheckList;
}

const Checklist = ({ checklist }: ChecklistProps) => {
  const completed = checklist.items?.filter((item) => item.complete).length;
  const countElement: number = checklist.items ? checklist.items?.length : 0;
  const percent = completed ? ((completed / countElement) * 100) : 0;
  return (
    <div className={styles.checklist}>
      <ChecklistTitle checkList={checklist} />
      <ChecklistProgress percent={percent} />
      <ul className={styles.list}>
        {
          checklist.items?.map((item) => (
            <CheckItem
              checklistId={checklist.check_list_id}
              key={item.check_list_item_id}
              item={item}
            />))
        }
      </ul>
      <NewItem checkListId={checklist.check_list_id} />
    </div>
  );
};

export default Checklist;
