export {
  getTasksAsync,
  createNewTaskAsync,
  duplicateTaskAsync,
  deleteTaskAsync,
  changeStatusTaskAsync,
} from './asyncActions';
export type { TTasksReducer, TTask } from '../entities';
export { taskInboxReducer, setSortTasksInbox } from './slice';
export { getPagination, getTasks, getStatus, getError, getSortTasksInbox, isLoadingStatus } from './selectors';
