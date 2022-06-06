import { TFilterAssignedTo } from 'store/slice/task/entities';
import { IconAll, IconAuthor, IconMy, IconObserver, IconResponsible } from './icons';
import React, { ReactNode } from 'react';
import { RolesIds } from 'shared';

export type FilterAssignedButtonType = {
  label: string;
  payload: TFilterAssignedTo;
  icon: ReactNode;
  tooltip: string;
};

export const assignedButtons: FilterAssignedButtonType[] = [
  {
    label: 'Все',
    payload: { assigned_to_me: true },
    icon: <IconAll />,
    tooltip: 'Назначен на любую роль',
  },
  {
    label: 'Назначенные мне',
    payload: { role_id_for_me: [RolesIds.PERFORMER] },
    icon: <IconMy />,
    tooltip: 'Исполнитель',
  },
  {
    label: 'На контроле',
    payload: { role_id_for_me: [RolesIds.RESPONSIBLE] },
    icon: <IconResponsible />,
    tooltip: 'Ответственный',
  },
  {
    label: 'Наблюдаю',
    payload: { role_id_for_me: [RolesIds.OBSERVER] },
    icon: <IconObserver />,
    tooltip: 'Наблюдатель',
  },
  {
    label: 'Автор',
    payload: { role_id_for_me: [RolesIds.AUTHOR] },
    icon: <IconAuthor />,
    tooltip: 'Автор',
  },
];
