/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthor, isResponsible } from 'shared/helpers';
import { TaskFormSlice, UserSlice } from 'store/slice';
import PerformerCategory from './PerformerCategory';
import StatusCategory from './StatusCategory';
import PriorityCategory from './PriorityCategory';
import styles from './index.module.scss';

const Details = () => {
  const dispatch = useDispatch();
  const roles = useSelector(TaskFormSlice.getRoles);
  const status = useSelector(TaskFormSlice.getTaskFormStatusTask);
  const priority = useSelector(TaskFormSlice.getPriority);
  const currentTaskId = useSelector(TaskFormSlice.getTaskFormId);
  const currentUserId = useSelector(UserSlice.userId);

  const isAuthorOrResponsible = isAuthor(currentUserId, roles)
    || isResponsible(currentUserId, roles);

  return (
    <>
      {
        status?.name
        && <StatusCategory status={status} currentTaskId={currentTaskId} />
      }
      <PerformerCategory roles={roles} isAuthorOrResponsible={isAuthorOrResponsible} />
      <PriorityCategory priority={priority} currentTaskId={currentTaskId} />
    </>
  );
};

export default Details;
