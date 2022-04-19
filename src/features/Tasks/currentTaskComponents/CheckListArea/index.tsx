import React from 'react';
import CheckList from 'features/Tasks/currentTaskComponents/CheckList';
import { useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';

const CheckListArea = () => {
  const checklists = useSelector(TaskFormSlice.getCheckLists);
  return (
    <div>
      {
        checklists && checklists.map((checklist) => (
          <CheckList key={checklist.check_list_id} checklist={checklist} />
        ))
      }
    </div>
  );
};

export default CheckListArea;
