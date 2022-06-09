import { TDetailsProps, TTitleProps } from '..';

export const generalParams = {
  'task.title_change':
    {
      title: {
        type: 'general',
        text: 'редактирование заголовка',
        alt: 'Неизвестный заголовок',
      } as TTitleProps,

      details: {
        type: 'empty',
      } as TDetailsProps,
    },

  'task.description_change':
    {
      title: {
        type: 'string',
        text: 'редактирование описания',
      } as TTitleProps,

      details: {
        type: 'empty',
      } as TDetailsProps,
    },

  'task.create':
    {
      title: {
        type: 'general',
        text: 'создание задачи',
      } as TTitleProps,

      details: {
        type: 'empty',
      } as TDetailsProps,
    },

  'task.clone':
    {
      title: {
        type: 'clone',
        text: 'дублирование задачи',
        alt: 'Задача удалена',
      } as TTitleProps,

      details: {
        type: 'empty',
      } as TDetailsProps,
    },

  'task.status_change':
    {
      title: {
        type: 'string',
        text: 'смена статуса на',
      } as TTitleProps,

      details: {
        type: 'status',
      } as TDetailsProps,
    },

  'task.priority_change':
    {
      title: {
        type: 'string',
        text: 'смена приоритета на',
      } as TTitleProps,

      details: {
        type: 'priority',
      } as TDetailsProps,
    },

  'task.form_result_change':
    {
      title: {
        type: 'string',
        text: 'изменение полей формы',
      } as TTitleProps,

      details: {
        type: 'resume',
      } as TDetailsProps,
    },
};
