import { TDetailsProps, TTitleProps } from '..';

export const checklistParams = {
  'task.check_list_assign':
    {
      title: {
        type: 'checklist',
        text: 'добавление чеклиста к задаче',
      } as TTitleProps,

      details: {
        type: 'empty',
      } as TDetailsProps,
    },

  'task.check_list_un_assign':
    {
      title: {
        type: 'checklist',
        text: 'удаление чеклиста у задачи',
      } as TTitleProps,

      details: {
        type: 'empty',
      } as TDetailsProps,
    },

  'check_list.item_change_complete':
    {
      title: {
        type: 'checklist',
        text: 'изменение состояния пункта чеклиста',
      } as TTitleProps,

      details: {
        type: 'checkboxChangeComplete',
      } as TDetailsProps,
    },

  'check_list.item_create':
    {
      title: {
        type: 'checklist',
        text: 'добавление пункта чеклиста',
      } as TTitleProps,

      details: {
        type: 'checkbox',
      } as TDetailsProps,
    },

  'check_list.item_delete':
    {
      title: {
        type: 'checklist',
        text: 'удаление пункта чеклиста',
      } as TTitleProps,

      details: {
        type: 'checkbox',
      } as TDetailsProps,
    },

  'check_list.item_change_message':
    {
      title: {
        type: 'checklist',
        text: 'изменение текста пункта чеклиста',
      } as TTitleProps,

      details: {
        type: 'checkbox',
      } as TDetailsProps,
    },

  'check_list.item_position_set':
    {
      title: {
        type: 'checklist',
        text: 'изменение позиции пункта чеклиста',
      } as TTitleProps,

      details: {
        type: 'checkboxSetPosition',
      } as TDetailsProps,
    },

  'check_list.title_change':
    {
      title: {
        type: 'checklist',
        text: 'изменение заголовка чеклиста на',
      } as TTitleProps,

      details: {
        type: 'empty',
      } as TDetailsProps,
    },
};
