/* eslint-disable no-unused-vars */
export type FilterAssignedButtonType = {
  label: string;
  value: string;
};

export enum TFilterAssignedTo {
  all = 0,
  my = 1,
}

export const assignedButtons: FilterAssignedButtonType[] = [
  { label: 'Все', value: 'all' },
  { label: 'Назначенные мне', value: 'my' },
];
