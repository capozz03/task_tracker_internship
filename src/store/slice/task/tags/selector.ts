import { TState } from 'store/configureStore';
import { createSelector } from '@reduxjs/toolkit';
import { isLoadingStatusCheck } from 'shared/helpers';

const getTagsSliceStore = (state: TState) => state.tags;

export const getTagsSelector = createSelector(getTagsSliceStore, ({ tags }) => tags);
export const isLoadingTags = createSelector(getTagsSliceStore,
  ({ status }) => isLoadingStatusCheck(status));
export const getCurrentTagSelector = createSelector(getTagsSliceStore,
  ({ currentTag }) => currentTag);
