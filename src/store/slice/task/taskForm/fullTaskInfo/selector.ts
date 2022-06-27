import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';
import { isLoadingStatusCheck, isSuccessStatusCheck } from 'shared/helpers';

const getTaskForm = (state: TState) => state.taskForm;

const getTaskInformation = createSelector(getTaskForm, ({ task }) => task);

export const getTask = createSelector(getTaskInformation, ({ task }) => task);
export const getTaskFormTitle = createSelector(getTaskInformation, ({ task }) => task?.title);
export const getTaskFormDescription = createSelector(
  getTaskInformation,
  ({ task }) => task?.description,
);
export const getTaskFormRoles = createSelector(getTaskInformation, ({ task }) => task?.roles);
export const getTaskFormStatusTask = createSelector(getTaskInformation, ({ task }) => task?.status);
export const getTaskFormStatus = createSelector(getTaskInformation, ({ status }) => status);
export const getTaskFormError = createSelector(getTaskInformation, ({ error }) => error);
export const getTaskFormIsVisibleForm = createSelector(
  getTaskInformation,
  ({ isVisibleForm }) => isVisibleForm,
);
export const isLoadingStatus = createSelector(getTaskInformation, ({ status }) =>
  isLoadingStatusCheck(status),
);
export const isLoadingStatusSuccess = createSelector(getTaskInformation, ({ status }) =>
  isSuccessStatusCheck(status),
);

export const getTaskFormId = createSelector(getTaskInformation, ({ task }) => task?.task_id);
export const getTaskFormPriority = createSelector(getTaskInformation, ({ task }) => task?.priority);

export const getDescriptionStatusCheck = createSelector(
  getTaskForm,
  ({ description }) => description.status,
);

export const getTitleStatusCheck = createSelector(getTaskForm, ({ title }) => title.status);

export const getStorageStatusCheck = createSelector(
  getTaskForm,
  ({ storageFile }) => storageFile.data.status,
);
