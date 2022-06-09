import { TDetailsProps, TTitleProps } from '..';

export const roleParams = {
  'task.role_assign':
    {
      title: {
        type: 'string',
        text: 'назначение роли',
      } as TTitleProps,

      details: {
        type: 'role',
        roleType: 'add',
      } as TDetailsProps,
    },

  'task.role_un_assign':
    {
      title: {
        type: 'string',
        text: 'снятие с роли',
      } as TTitleProps,

      details: {
        type: 'role',
        roleType: 'remove',
      } as TDetailsProps,
    },
};
