import { taskFormHistoryReducer } from './history/slice';
import { combineReducers } from '@reduxjs/toolkit';
import { ChecklistReducer } from 'store/slice/task/taskForm/checkList';
import { taskFormDataReducer } from 'store/slice/task/taskForm/fullTaskInfo/slice';
import { taskFormDatesReducer } from './dates/slice';
import { taskFormPriorityReducer } from './priority/slice';
import { taskFormRolesReducer } from './roles/slice';
import { taskFormTagsReducer } from './tags/slice';
import { StorageFilesReducer } from './storageFiles';
import { resumeSliceReducer } from './resume';
import { descriptionReducer } from './setDescriptionFromTask';
import { titleReducer } from './setTitleFromTask/slice';

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
  isLoadingStatusSuccess,
  getTaskFormStatusTask,
  getTaskFormId,
  getTaskFormPriority,
  getDescriptionStatusCheck,
  getTitleStatusCheck,
  getStorageStatusCheck,
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

export { taskFormDatesReducer, setDateStart, setDateStop } from './dates/slice';
export { changeTaskDateStart, changeTaskDateStop } from './dates/asyncActions';
export { getDateStart, getDateStop, isLoadingDatesStatus } from './dates/selector';

export { taskFormTagsReducer, setTags } from './tags/slice';
export { addTagToTask, removeTagToTask } from './tags/asyncActions';
export { getTags, isLoadingTagsStatus } from './tags/selector';

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

export { taskFormPriorityReducer, taskFormPrioritySelector, setPriority } from './priority/slice';
export { changeTaskPriority } from './priority/asyncActions';
export { getPriority, isLoadingPriorityStatus } from './priority/selector';

export { taskFormHistoryReducer, taskFormHistorySelector, resetTaskHistory } from './history/slice';
export { getTaskHistoryAsync } from './history/asyncActions';
export { getHistory, getHistoryPagination, isLoadingHistory } from './history/selector';

export const taskFormReducer = combineReducers({
  storageFile: StorageFilesReducer,
  checkList: ChecklistReducer,
  description: descriptionReducer,
  title: titleReducer,
  task: taskFormDataReducer,
  roles: taskFormRolesReducer,
  resume: resumeSliceReducer,
  priority: taskFormPriorityReducer,
  dates: taskFormDatesReducer,
  tags: taskFormTagsReducer,
  history: taskFormHistoryReducer,
});
