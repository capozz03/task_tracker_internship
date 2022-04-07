type TaskStatusesType = {
  status: string;
  color: string;
  taskStatusId: string;
};

export const taskStatuses: TaskStatusesType[] = [
  {
    status: 'Создана',
    color: '#50B5FF',
    taskStatusId: 'cbb7199e-cb25-4dce-bf4e-24a8a5e07ef2',
  },
  {
    status: 'В работе',
    color: '#3DD598',
    taskStatusId: '372d63ff-3ae3-4be2-a606-38940d7f8c8f',
  },
  {
    status: 'Выполнена',
    color: '#A461D8',
    taskStatusId: '8536592a-7340-4e10-ac4b-a280652c9310',
  },
  {
    status: 'Не выполнена',
    color: '#FC5A5A',
    taskStatusId: '599f5d03-1ef0-4a5b-a18c-33a4f44c4610',
  },
];
