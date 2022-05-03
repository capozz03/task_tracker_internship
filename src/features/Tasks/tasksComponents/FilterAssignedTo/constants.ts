export type FilterAssignedButtonType = {
  label: string;
  value: boolean;
};

export const assignedButtons: FilterAssignedButtonType[] = [
  { label: 'Все', value: false },
  { label: 'Назначенные мне', value: true },
];
