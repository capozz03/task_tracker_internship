import React from 'react';
import CheckList from 'features/Tasks/currentTaskComponents/CheckList';
import { useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import CheckListFormCreate from './CheckListFormCreate';
import { usePermissions } from 'shared/helpers';

const CheckListArea = () => {
  const checklists = useSelector(TaskFormSlice.getCheckLists);
  const isCreateNewCheckList = useSelector(TaskFormSlice.isCreateNewCheckList);
  const roles = useSelector(TaskFormSlice.getTaskFormRoles);
  const can = usePermissions(
    ['add/change/remove.checklist', 'add/change/remove.checkbox'],
    roles,
  );

  return (
    <div>
      {
        can['add/change/remove.checklist'] && isCreateNewCheckList && <CheckListFormCreate />
      }
      {
        checklists && checklists.map((checklist) => (
          <CheckList key={checklist.check_list_id} checklist={checklist} can={can} />
        ))
      }
    </div>
  );
};

export default CheckListArea;
