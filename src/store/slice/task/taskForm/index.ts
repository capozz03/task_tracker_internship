import { combineReducers } from '@reduxjs/toolkit';
import { ChecklistReducer } from 'store/slice/task/taskForm/checkList';
import { taskFormDataReducer } from 'store/slice/task/taskForm/fullTaskInfo/slice';
import { taskFormRolesReducer } from './roles/slice';
import { StorageFilesReducer } from './storageFiles';
import { resumeSliceReducer } from './resume';

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
  getTaskFormRoles,
  getTaskFormTitle,
  isLoadingStatus,
  getTaskFormStatusTask,
  getTaskFormId,
} from './fullTaskInfo/selector';

export {
  isCreatedChecklist,
  isCreatedChecklistItem,
  isCreateNewCheckList,
  getCheckLists,
  checklistStatus,
  checklistIsLoadingStatus,
} from './checkList/selector';

export {
  getTaskFormStatusTaskFormRequired,
  getTaskFormResultForm,
  getFormResultComment,
  getFormResultResume,
} from './resume/selectors';

export {
  setFormResult,
} from './resume/asyncAction';

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
  updateCheckList,
  swapItemInChecklist,
} from './fullTaskInfo/slice';

export { taskFormRolesReducer, taskFormRolesSelector, setRoles } from './roles/slice';
export { addUserRole, removeUserRole } from './roles/asyncActions';
export { getRoles, isLoadingRolesStatus } from './roles/selector';
export {
  imagePreview,
  getStorageFiles,
  getStorageImages,
  isVisibleStorageFiles,
  progressBar,
  getStorageCount,
} from './storageFiles/selector';

export {
  createStorageFile,
  downloadStorageFile,
  deleteStorageFile,
  getStorageFileDetails,
} from './storageFiles/asyncActions';

export { showFormCreateChecklist, hiddenFormCreateChecklist } from './checkList/uiSlice';
export {
  showFormStorageFiles,
  hiddenFormStorageFiles,
  setProgress,
} from './storageFiles/uiSlice';

export const taskFormReducer = combineReducers({
  storageFile: StorageFilesReducer,
  checkList: ChecklistReducer,
  task: taskFormDataReducer,
  roles: taskFormRolesReducer,
  resume: resumeSliceReducer,
});
