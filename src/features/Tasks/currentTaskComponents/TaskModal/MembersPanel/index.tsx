import React from 'react';
import MemberCategory from 'features/Task/taskModalComponents/MemberCategory';
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
          <MemberCategory name="Автор">
            <UserLabel
              key={roles.author.userId}
              user={roles.author}
              roleId={RolesIds.AUTHOR}
              roleName="Автор"
              canRemove={false}
            />
          </MemberCategory>
        )
      }
      {
        roles?.observers && roles.observers.length !== 0
        && (
          <MemberCategory name="Наблюдатель">
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
          </MemberCategory>
        )
      }
      {
        roles?.responsible && roles.responsible.length !== 0
        && (
          <MemberCategory name="Ответственный">
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
          </MemberCategory>
        )
      }
      {
        isAuthorOrResponsible
        && <MembersChanger />
      }
    </>
  );
};

export default MembersPanel;
