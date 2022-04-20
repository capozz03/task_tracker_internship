import { combineReducers } from '@reduxjs/toolkit';
import { ChecklistReducer } from 'store/slice/task/taskForm/checkList';
import { taskFormDataReducer } from 'store/slice/task/taskForm/fullTaskInfo/slice';

export { getTaskByIdAsync } from './getTaskById';
export type { TTasksReducer, TTask } from 'store/slice/task/entities';
export { setTitleAsync } from './setTitleFromTask';
export { changeCheckListTitle,
  changeItemForChecklist,
  changePositionItemForChecklist,
  changeStatusItemForChecklist,
  createItemForChecklist,
  deleteItemForChecklist,
  createCheckList } from './checkList/asyncActions';

export {
  getTaskFormIsVisibleForm,
  getTask,
  getTaskFormError,
  getTaskFormStatus,
  getTaskFormTitle,
  isLoadingStatus,
  isCreatedChecklist,
  isCreatedChecklistItem,
  getCheckLists,
} from './fullTaskInfo/selector';
export {
  showTaskForm,
  hiddenTaskForm,
  taskFormDataReducer,
  taskFormSelector,
  setTitleFromTaskForm,
  changeStatusItemForChecklistTaskForm,
  pushItemForCheckList,
  removeItemFromCheckList,
} from './fullTaskInfo/slice';

export const taskFormReducer = combineReducers({
  checkList: ChecklistReducer,
  task: taskFormDataReducer,
});
