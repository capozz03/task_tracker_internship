import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';
import { isLoadingStatusCheck } from 'shared/helpers';

const getTaskForm = (state: TState) => state.taskForm;
const getTagsInfo = createSelector(getTaskForm, ({ tags }) => tags);

export const getTags = createSelector(getTagsInfo, ({ data }) => data);
export const isLoadingTagsStatus = createSelector(getTagsInfo, ({ status }) =>
  isLoadingStatusCheck(status),
);
