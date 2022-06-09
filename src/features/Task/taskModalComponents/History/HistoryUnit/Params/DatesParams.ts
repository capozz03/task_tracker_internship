import { TDetailsProps, TTitleProps } from '..';

export const dateParams = {
  'task.exec_start_change':
    {
      title: {
        type: 'string',
        text: 'изменение даты начала',
      } as TTitleProps,

      details: {
        type: 'dateStart',
      } as TDetailsProps,
    },

  'task.exec_stop_change':
    {
      title: {
        type: 'string',
        text: 'изменение даты окончания',
      } as TTitleProps,

      details: {
        type: 'dateStop',
      } as TDetailsProps,
    },
};
