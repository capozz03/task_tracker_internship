import { Moment } from 'moment';
import { TRoles } from 'store/slice/task/entities';
import { TRolesUnit, TStateData } from 'store/slice/task/taskForm/roles/entities';
import { RolesIds } from './enums';

export const convertRolesToObject = (rolesData: TRoles[]) => {
  const roles: TStateData = {
    author: null,
    performers: [],
    responsible: [],
    observers: [],
  };

  rolesData.forEach((user) => {
    const unit: TRolesUnit = {
      userId: user.assign_user.user_id,
      userName: user.assign_user.name,
      logo: user.assign_user.logo,
      created: user.task_role.created,
    };

    switch (user.task_role.task_role_id) {
      case RolesIds.AUTHOR:
        roles.author = unit;
        break;
      case RolesIds.PERFORMER:
        roles.performers.push(unit);
        break;
      case RolesIds.RESPONSIBLE:
        roles.responsible.push(unit);
        break;
      case RolesIds.OBSERVER:
        roles.observers.push(unit);
        break;
      default:
        break;
    }
  });

  roles.observers.sort();
  return roles;
};

export const formatDate = (value: Moment, withTime: boolean = true) => {
  let arr;

  if (withTime) arr = value.locale('ru').format('DD MMMM YYYY HH:mm').split(' ');
  else arr = value.locale('ru').format('DD MMMM YYYY').split(' ');

  arr[1] = arr[1].toLowerCase().slice(0, 3);
  return arr.join(' ');
};
