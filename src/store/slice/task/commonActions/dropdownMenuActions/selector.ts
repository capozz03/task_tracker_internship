import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'store/configureStore';
import { isLoadingStatusCheck } from 'shared/helpers/requestStatusesCheckers';

const common = (state: TState) => state.common;
const dropdownMenu = createSelector(common, ({ dropdownMenuTask }) => dropdownMenuTask);
export const getTaskDropdownMenuSelector = createSelector(dropdownMenu, ({ task }) => task);
export const isVisibleModalDeleteTaskSelector = createSelector(dropdownMenu,
  ({ visibleModalDeleteTask }) => visibleModalDeleteTask);

export const isLoadingCommonActionTask = createSelector(dropdownMenu,
  ({ status }) => isLoadingStatusCheck(status));
