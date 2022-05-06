import { combineReducers } from '@reduxjs/toolkit';
import { commonActionReducer } from './dropdownMenuActions/slice';

export { duplicateTaskAsync, deleteTaskAsync } from './dropdownMenuActions';
export { setTask } from './dropdownMenuActions/slice';
export { getTaskDropdownMenuSelector } from './dropdownMenuActions/selector';

export const commonReducer = combineReducers({
  dropdownMenuTask: commonActionReducer,
});
