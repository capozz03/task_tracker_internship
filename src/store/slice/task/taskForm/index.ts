import { combineReducers } from '@reduxjs/toolkit';
import { ChecklistReducer } from 'store/slice/task/taskForm/checkList';
import { taskFormDataReducer } from 'store/slice/task/taskForm/fullTaskInfo/slice';
import { StorageFilesReducer } from './storageFiles';

export { getTaskByIdAsync } from './getTaskById';
export type { TTasksReducer, TTask } from 'store/slice/task/entities';
export { setTitleAsync } from './setTitleFromTask';
export {
  changeCheckListTitle,
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
  setDescriptionFromTaskForm,
} from './fullTaskInfo/slice';

export { getStorageFiles, getStorageImages, isVisibleStorageFiles } from './storageFiles/selector';
export {
  createStorageFile,
  downloadStorageFile,
  deleteStorageFile,
} from './storageFiles/asyncActions';

export { showFormCreateChecklist, hiddenFormCreateChecklist } from './checkList/uiSlice';
export { showFormStorageFiles, hiddenFormStorageFiles } from './storageFiles/uiSlice';

export const taskFormReducer = combineReducers({
  storageFile: StorageFilesReducer,
  checkList: ChecklistReducer,
  task: taskFormDataReducer,
});
