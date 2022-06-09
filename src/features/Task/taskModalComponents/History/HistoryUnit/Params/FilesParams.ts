import { TDetailsProps, TTitleProps } from '..';

export const fileParams = {
  'task.storage_file_assign':
    {
      title: {
        type: 'string',
        text: 'добавление файла',
      } as TTitleProps,

      details: {
        type: 'file',
      } as TDetailsProps,
    },

  'task.storage_file_un_assign':
    {
      title: {
        type: 'string',
        text: 'удаление файла',
      } as TTitleProps,

      details: {
        type: 'file',
      } as TDetailsProps,
    },
};
