import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';
import { isLoadingStatusCheck } from 'shared/helpers';

const getTaskForm = (state: TState) => state.taskForm;
const getCheckList = createSelector(getTaskForm, ({ checkList }) => checkList.ui);

export const isCreatedChecklist = createSelector(getCheckList,
  ({ isVisibleCreateChecklist }) => isVisibleCreateChecklist);

export const isCreatedChecklistItem = createSelector(getCheckList,
  ({ isVisibleCreateItemChecklist }) => isVisibleCreateItemChecklist);

export const getCheckLists = createSelector(getTaskForm, ({ task }) => task.task?.check_lists);

export const isCreateNewCheckList = createSelector(getCheckList,
  ({ isVisibleCreateChecklist }) => isVisibleCreateChecklist);

export const checklistData = createSelector(getTaskForm, ({ checkList }) => checkList.data);
export const checklistStatus = createSelector(checklistData, ({ status }) => status);
export const checklistIsLoadingStatus = createSelector(checklistData, ({ status }) =>
  isLoadingStatusCheck(status),
);
