import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';
import { TFormResult } from '../../entities';

const getTaskForm = (state: TState) => state.taskForm;
const getTaskInformation = createSelector(getTaskForm, ({ task }) => task);

export const getTaskFormAvailable = createSelector(
  getTaskInformation,
  ({ task }) => task?.form_available,
);

export const getTaskFormStatusTaskFormRequired = createSelector(
  getTaskInformation,
  ({ task }) => task?.status.form_result_required,
);

export const getTaskFormResultForm = createSelector(
  getTaskInformation,
  ({ task }) => task?.form_result,
);

export const getFormResultComment = createSelector(
  getTaskInformation,
  ({ task }) => task?.form_result?.find((item: TFormResult) => item.field_name === 'comment'),
);

export const getFormResultResume = createSelector(
  getTaskInformation,
  ({ task }) => task?.form_result?.find((item: TFormResult) => item.field_name === 'resume'),
);
