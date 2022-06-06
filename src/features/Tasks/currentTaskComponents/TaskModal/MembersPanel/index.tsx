import React from 'react';
import DetailCategory from 'features/Task/taskModalComponents/Details/DetailCategory';
import MembersChanger from 'features/Task/taskModalComponents/MembersChanger';
import UserLabel from 'features/Task/taskModalComponents/UserLabel';
import { useSelector } from 'react-redux';
import { TaskFormSlice, UserSlice } from 'store/slice';
import { isAuthor, isResponsible, RolesIds } from 'shared/helpers';

const MembersPanel = () => {
  const roles = useSelector(TaskFormSlice.getRoles);
  const currentUserId = useSelector(UserSlice.userId);

  const isAuthorOrResponsible = isAuthor(currentUserId, roles)
    || isResponsible(currentUserId, roles);

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
                  canRemove={isAuthorOrResponsible}
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
                  canRemove={isAuthorOrResponsible}
                />
              ))
            }
          </DetailCategory>
        )
      }
      {
        isAuthorOrResponsible
        && (
          <MembersChanger buttonType="blue" />
        )
      }
    </>
  );
};

export default MembersPanel;
