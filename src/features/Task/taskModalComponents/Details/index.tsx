/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RolesIds } from 'shared';
import { isAuthor, isResponsible } from 'shared/helpers';
import { TaskFormSlice, UserSlice } from 'store/slice';
import DetailCategory from '../DetailCategory';
import MembersChanger from '../MembersChanger';
import UserLabel from '../UserLabel';
import styles from './index.module.scss';
import { TaskStatus } from 'features/Tasks/tasksComponents';
import { TaskStatuses } from 'shared/helpers/enums';

const Details = () => {
  const dispatch = useDispatch();
  const roles = useSelector(TaskFormSlice.getRoles);
  const status = useSelector(TaskFormSlice.getTaskFormStatusTask);
  const currentTaskId = useSelector(TaskFormSlice.getTaskFormId);
  const currentUserId = useSelector(UserSlice.userId);

  const isAuthorOrResponsible = isAuthor(currentUserId, roles)
    || isResponsible(currentUserId, roles);

  const performerContent = () => {
    if (isAuthorOrResponsible) return <MembersChanger buttonType="gray" />;
    return <p className={styles.notPerformer}>Без исполнителя</p>;
  };

  const statusChanger = (prevStatusId: string, taskId: string, newStatusId: string) => {
    console.log(prevStatusId, taskId, newStatusId);
  };

  const statusChangeHandler = (value: string) => (
    statusChanger(status?.task_status_id || '', currentTaskId || '', value)
  );

  return (
    <>
      {
        status?.name
        && (
          <DetailCategory name="Статус" type="details">
            <TaskStatus
              defaultValue={status.name}
              onChange={statusChangeHandler}
            />
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
              performerContent()
            )
        }
      </DetailCategory>
    </>
  );
};

export default Details;
