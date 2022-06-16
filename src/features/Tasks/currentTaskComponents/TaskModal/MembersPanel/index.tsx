import React, { useEffect, useState } from 'react';
import DetailCategory from 'features/Task/taskModalComponents/Details/DetailCategory';
import MembersChanger from 'features/Task/taskModalComponents/MembersChanger';
import UserLabel from 'features/Task/taskModalComponents/UserLabel';
import { useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { checkPermission, RolesIds } from 'shared/helpers';

const MembersPanel = () => {
  const roles = useSelector(TaskFormSlice.getRoles);
  const rolesArray = useSelector(TaskFormSlice.getTaskFormRoles);
  const [can, setCan] = useState({
    changeResponsible: checkPermission('change.responsible', rolesArray),
    changeObserver: checkPermission('change.observer', rolesArray),
    changePerformer: checkPermission('change.performer', rolesArray),
  });

  useEffect(() => {
    setCan({
      changeResponsible: checkPermission('change.responsible', rolesArray),
      changeObserver: checkPermission('change.observer', rolesArray),
      changePerformer: checkPermission('change.performer', rolesArray),
    });
  }, [rolesArray]);

  return (
    <>
      {
        roles?.author
        && (
          <DetailCategory name="Автор" type="members">
            <UserLabel
              key={roles.author.userId}
              user={roles.author}
              roleId={RolesIds.AUTHOR}
              roleName="Автор"
              canRemove={false}
            />
          </DetailCategory>
        )
      }
      {
        roles?.observers && roles.observers.length !== 0
        && (
          <DetailCategory name="Наблюдатель" type="members">
            {
              roles.observers.map((member) => (
                <UserLabel
                  key={member.userId}
                  user={member}
                  roleId={RolesIds.OBSERVER}
                  roleName="Наблюдатель"
                  canRemove={can.changeObserver}
                />
              ))
            }
          </DetailCategory>
        )
      }
      {
        roles?.responsible && roles.responsible.length !== 0
        && (
          <DetailCategory name="Ответственный" type="members">
            {
              roles.responsible.map((member) => (
                <UserLabel
                  key={member.userId}
                  user={member}
                  roleId={RolesIds.RESPONSIBLE}
                  roleName="Ответственный"
                  canRemove={can.changeResponsible}
                />
              ))
            }
          </DetailCategory>
        )
      }
      {
        (can.changeObserver || can.changePerformer || can.changeResponsible)
        && <MembersChanger buttonType="blue" />
      }
    </>
  );
};

export default MembersPanel;
