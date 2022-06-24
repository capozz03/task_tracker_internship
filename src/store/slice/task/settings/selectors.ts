import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';

const getSettingsState = (state: TState) => state.settings;

export const getPagination = createSelector(
  getSettingsState, ({ pagination }) => pagination);

export const getSort = createSelector(
  getSettingsState, ({ sort }) => sort);

export const getFiltersAssignTo = createSelector(
  getSettingsState, ({ filters }) => filters.assignToFilterIndex);
