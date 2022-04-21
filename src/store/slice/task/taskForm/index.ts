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
  createCheckList,
  detachChecklist,
} from './checkList/asyncActions';

export {
  getTaskFormIsVisibleForm,
  getTask,
  getTaskFormError,
  getTaskFormStatus,
  getTaskFormTitle,
  isLoadingStatus,
} from './fullTaskInfo/selector';

export {
  isCreatedChecklist,
  isCreatedChecklistItem,
  isCreateNewCheckList,
  getCheckLists,
} from './checkList/selector';

export {
  showTaskForm,
  hiddenTaskForm,
  taskFormDataReducer,
  taskFormSelector,
  setTitleFromTaskForm,
  changeStatusItemForChecklistTaskForm,
  pushItemForCheckList,
  removeItemFromCheckList,
  updateTask,
} from './fullTaskInfo/slice';

export { showFormCreateChecklist, hiddenFormCreateChecklist } from './checkList/uiSlice';

export const taskFormReducer = combineReducers({
  checkList: ChecklistReducer,
  task: taskFormDataReducer,
});
