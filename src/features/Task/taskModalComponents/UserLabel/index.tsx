import React from 'react';
import { UserAvatar } from 'features/Tasks/tasksComponents';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserRole } from 'store/slice/task/taskForm';
import { RolesIds } from 'shared';
import { TaskFormSlice } from 'store/slice';
import { CrossIcon } from 'shared/ui/icons';
import { TRolesUnit } from 'store/slice/task/taskForm/roles/entities';
import styles from './index.module.scss';

type TProps = {
  user: TRolesUnit,
  canRemove: boolean;
  roleId: RolesIds;
  roleName: string;
}

const UserLabel = ({ user, roleId, roleName, canRemove = false }: TProps) => {
  const dispatch = useDispatch();
  const currentTaskId = useSelector(TaskFormSlice.getTaskFormId);

  const onRemoveClick = () => {
    dispatch(removeUserRole({
      userId: user.userId,
      userName: user.userName,
      taskId: currentTaskId,
      roleId,
      roleName,
    }));
  };

  return (
    <div className={styles.label}>
      <UserAvatar user={{ user_id: user.userId, name: user.userName, logo: user.logo }} color="#FF974A" />
      <p>{user.userName}</p>
      {
        canRemove
        && (
        <button type="button" onClick={onRemoveClick} className={styles.button}>
          <CrossIcon />
        </button>
        )
      }
    </div>
  );
};

export default UserLabel;
