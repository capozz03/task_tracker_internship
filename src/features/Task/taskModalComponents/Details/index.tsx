import { TaskStatus } from 'features/Tasks/tasksComponents';
import React from 'react';
import { useSelector } from 'react-redux';
import { RolesIds } from 'shared';
import { isAuthor, isResponsible } from 'shared/helpers';
import { TaskFormSlice, UserSlice } from 'store/slice';
import DetailCategory from '../DetailCategory';
import MembersChanger from '../MembersChanger';
import UserLabel from '../UserLabel';

const Details = () => {
  const roles = useSelector(TaskFormSlice.getRoles);
  const status = useSelector(TaskFormSlice.getTaskFormStatusTask);
  const currentUserId = useSelector(UserSlice.userId);

  const isAuthorOrResponsible = isAuthor(currentUserId, roles)
    || isResponsible(currentUserId, roles);

  return (
    <>
      {
        status
        && (
          <DetailCategory name="Статус" type="details">
            <TaskStatus defaultValue={status.name} />
          </DetailCategory>
        )
      }
      <DetailCategory name="Назначена" type="details">
        {
          roles?.performers && roles?.performers.length !== 0
            ? (
              roles.performers.map((member) => (
                <UserLabel
                  key={member.userId}
                  user={member}
                  roleId={RolesIds.PERFORMER}
                  roleName="Исполнитель"
                  canRemove={isAuthorOrResponsible}
                />
              ))
            )
            : (
              <MembersChanger buttonType="gray" />
            )
        }
      </DetailCategory>
    </>
  );
};

export default Details;
