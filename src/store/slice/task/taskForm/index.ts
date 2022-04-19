import { combineReducers } from '@reduxjs/toolkit';
import { ChecklistReducer } from 'store/slice/task/taskForm/checkList';
import { taskFormDataReducer } from 'store/slice/task/taskForm/data/slice';

export { getTaskByIdAsync } from 'store/slice/task/taskForm/getTaskById';
export type { TTasksReducer, TTask } from 'store/slice/task/entities';
export { setTitleAsync } from 'store/slice/task/taskForm/setTitleFromTask';
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
} from 'store/slice/task/taskForm/data/taskSelector';
export {
  showTaskForm,
  hiddenTaskForm,
  taskFormDataReducer,
  taskFormSelector,
  setTitleFromTaskForm,
} from 'store/slice/task/taskForm/data/slice';

export const taskFormReducer = combineReducers({
  Checklist: ChecklistReducer,
  Data: taskFormDataReducer,
});
