import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';

const getTaskForm = (state: TState) => state.taskForm;
const getStorageFile = createSelector(getTaskForm, ({ storageFile }) => storageFile.ui);

export const getStorageFiles = createSelector(getTaskForm, ({ task }) =>
  task.task?.storage_files?.filter((file) => file.type === 'file'),
);

export const getStorageImages = createSelector(getTaskForm, ({ task }) =>
  task.task?.storage_files?.filter((file) => file.type === 'image'),
);

export const isVisibleStorageFiles = createSelector(
  getStorageFile,
  ({ isVisibleStorageFiles }) => isVisibleStorageFiles,
);
