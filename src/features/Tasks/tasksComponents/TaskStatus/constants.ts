type TaskStatusesType = {
  status: string;
  color: string;
};

export const taskStatuses: TaskStatusesType[] = [
  {
    status: 'Создана',
    color: '#50B5FF',
  },
  {
    status: 'В работе',
    color: '#3DD598',
  },
  {
    status: 'Выполнена',
    color: '#A461D8',
  },
  {
    status: 'Не выполнена',
    color: '#FC5A5A',
  },
];
