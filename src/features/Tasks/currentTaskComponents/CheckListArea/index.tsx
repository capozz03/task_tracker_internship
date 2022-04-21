import React from 'react';
import CheckList from 'features/Tasks/currentTaskComponents/CheckList';
import { useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import CheckListFormCreate from './CheckListFormCreate';

const CheckListArea = () => {
  const checklists = useSelector(TaskFormSlice.getCheckLists);
  const isCreateNewCheckList = useSelector(TaskFormSlice.isCreateNewCheckList);
  return (
    <div>
      {
        isCreateNewCheckList && <CheckListFormCreate />
      }
      {
        checklists && checklists.map((checklist) => (
          <CheckList key={checklist.check_list_id} checklist={checklist} />
        ))
      }
    </div>
  );
};

export default CheckListArea;
