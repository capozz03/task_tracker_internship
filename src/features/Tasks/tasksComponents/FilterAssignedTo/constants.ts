/* eslint-disable no-unused-vars */
import { TTaskSearchAssignedToMe } from 'store/slice/task/entities';

export type FilterAssignedButtonType = {
  label: string;
  value: TTaskSearchAssignedToMe;
};

export enum TFilterAssignedTo {
  all = 0,
  my = 1,
}

export const assignedButtons: FilterAssignedButtonType[] = [
  { label: 'Все', value: null },
  { label: 'Назначенные мне', value: true },
];
