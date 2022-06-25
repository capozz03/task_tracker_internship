import { rolesIds } from './rolesIds';
import { rolesMatrix } from './rolesMatrix';
import { clientCookies } from 'shared/helpers/cookies';
import { TRoles } from 'store/slice/task/entities';
import { TPermission, TRoleName } from './types';

export const hasRole = (
  roleName: TRoleName | 'anything',
  rolesList: TRoles[] | undefined | null,
  memberId: string = '',
): boolean => {
  if (!rolesList) return false;

  const userId = memberId || clientCookies.getUserId();
  const currentUserRoles = rolesList.filter(
    (unit) => unit.assign_user.user_id === userId);

  if (roleName === 'anything') {
    return !!currentUserRoles.length;
  }

  if (currentUserRoles.find(
    (unit) => rolesIds[roleName] === unit.task_role.task_role_id,
  )) return true;

  return false;
};

export const checkPermission = (
  action: TPermission,
  rolesList: TRoles[] | undefined | null,
): boolean => {
  if (!rolesList) return false;

  const userId = clientCookies.getUserId();
  const currentUserRoles = rolesList.filter(
    (unit) => unit.assign_user.user_id === userId);

  const { availableToRoles: appropriateRoles } = rolesMatrix[action];

  // eslint-disable-next-line no-restricted-syntax
  for (const role of appropriateRoles) {
    if (currentUserRoles.find(
      (unit) => rolesIds[role] === unit.task_role.task_role_id,
    )) return true;
  }

  return false;
};
