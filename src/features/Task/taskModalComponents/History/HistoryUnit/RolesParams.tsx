import React from 'react';
import { UserAvatar } from 'features/Tasks/tasksComponents';
import { THistoryUnit } from 'store/slice/task/taskForm/history/entities';
import { TUser } from 'store/slice/user/entities';
import { historyIcons } from 'shared/ui/icons';
import styles from './index.module.scss';
import { TParams } from '.';

type TProps = {
  user: TUser | undefined,
  isAdd: boolean,
  roleName: string | undefined
};

const { CheckIcon, CrossIcon } = historyIcons;

const HistoryUnitRoleDetails = ({ user, isAdd, roleName }: TProps) => (
  <div className={styles.RolesContainer}>
    <UserAvatar
      user={user || { user_id: '-1', name: 'Неизвестный пользователь' }}
      color="#C3AEFF"
    />
    <div>
      <p className={styles.RolesName}>
        { user?.name || 'Неизвестный пользователь' }
      </p>
      <p className={styles.RolesDesc}>
        { isAdd ? <CheckIcon /> : <CrossIcon /> }
        { roleName || 'Неизвестная роль' }
      </p>
    </div>
  </div>
);

function getRolesParams(unit: THistoryUnit) {
  const result: TParams = { title: '', details: '' };

  switch (unit.command_code) {
    case 'task.role_assign':
      result.title = 'назначение роли';
      result.details = (
        <HistoryUnitRoleDetails
          user={unit.params.assign_user}
          roleName={unit.params.task_role?.name}
          isAdd
        />
      );
      break;
    case 'task.role_un_assign':
      result.title = 'снятие с роли';
      result.details = (
        <HistoryUnitRoleDetails
          user={unit.params.assign_user}
          roleName={unit.params.task_role?.name}
          isAdd={false}
        />
      );
      break;
    default:
      break;
  }

  return result;
}

export default getRolesParams;
