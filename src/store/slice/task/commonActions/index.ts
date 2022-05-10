import { combineReducers } from '@reduxjs/toolkit';
import { commonActionReducer } from './dropdownMenuActions/slice';

export { duplicateTaskAsync, deleteTaskAsync } from './dropdownMenuActions';
export { setTask, clearState, showModalForDeleteTask } from './dropdownMenuActions/slice';
export { getTaskDropdownMenuSelector, isVisibleModalDeleteTaskSelector, isLoadingCommonActionTask } from './dropdownMenuActions/selector';

export const commonReducer = combineReducers({
  dropdownMenuTask: commonActionReducer,
});
