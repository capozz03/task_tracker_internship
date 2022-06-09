import moment, { Moment } from 'moment';
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
  moment.updateLocale('ru', {
    monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  });

  if (withTime) return value.locale('ru').format('DD MMM YYYY HH:mm');

  return value.locale('ru').format('DD MMM YYYY');
};

export const formatDateOnTaskHistoryView = (value: string) => {
  const answer = formatDate(moment(value));
  const now = +moment().format('YYYYMMDD');
  const date = +moment(value).format('YYYYMMDD');

  switch (now - date) {
    case 0:
      return `Сегодня, ${answer.slice(-5)}`;
    case 1:
      return `Вчера, ${answer.slice(-5)}`;
    default:
      return answer;
  }
};
