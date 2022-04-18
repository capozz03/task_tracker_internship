import { combineReducers } from '@reduxjs/toolkit';
import { checklistDataReducer } from 'store/slice/task/taskForm/checkList/slice';
import { checklistUIReducer } from 'store/slice/task/taskForm/checkList/uiSlice';

export { createCheckList } from './asyncActions';

export const ChecklistReducer = combineReducers({
  data: checklistDataReducer,
  ui: checklistUIReducer,
});
