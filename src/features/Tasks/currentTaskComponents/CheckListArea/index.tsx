import React, { useEffect, useState } from 'react';
import CheckList from 'features/Tasks/currentTaskComponents/CheckList';
import { useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import CheckListFormCreate from './CheckListFormCreate';
import { checkPermission } from 'shared/helpers';

const CheckListArea = () => {
  const checklists = useSelector(TaskFormSlice.getCheckLists);
  const isCreateNewCheckList = useSelector(TaskFormSlice.isCreateNewCheckList);
  const roles = useSelector(TaskFormSlice.getTaskFormRoles);

  const [can, setCan] = useState({
    changeChecklist: checkPermission('add/change/remove.checklist', roles),
    changeCheckbox: checkPermission('add/change/remove.checkbox', roles),
  });

  useEffect(() => {
    setCan({
      changeChecklist: checkPermission('add/change/remove.checklist', roles),
      changeCheckbox: checkPermission('add/change/remove.checkbox', roles),
    });
  }, [roles]);

  return (
    <div>
      {
        can.changeChecklist && isCreateNewCheckList && <CheckListFormCreate />
      }
      {
        checklists && checklists.map((checklist) => (
          <CheckList key={checklist.check_list_id} checklist={checklist} permissions={can} />
        ))
      }
    </div>
  );
};

export default CheckListArea;
