/* eslint-disable no-unused-vars */
import { TTaskSearchAssignedToMe } from 'store/slice/task/entities';

export type FilterAssignedButtonType = {
  label: string;
  value: TTaskSearchAssignedToMe | false;
};

export const assignedButtons: FilterAssignedButtonType[] = [
  { label: 'Все', value: false },
  { label: 'Назначенные мне', value: true },
];
