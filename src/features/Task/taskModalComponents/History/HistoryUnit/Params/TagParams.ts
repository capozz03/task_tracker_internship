import { TDetailsProps, TTitleProps } from '..';

export const tagParams = {
  'task.tag_assign':
    {
      title: {
        type: 'string',
        text: 'добавление тега',
      } as TTitleProps,

      details: {
        type: 'tag',
        tagType: 'add',
      } as TDetailsProps,
    },

  'task.tag_un_assign':
    {
      title: {
        type: 'string',
        text: 'снятие тега',
      } as TTitleProps,

      details: {
        type: 'tag',
        tagType: 'remove',
      } as TDetailsProps,
    },
};
