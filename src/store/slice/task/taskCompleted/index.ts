export { getTasksAsync, changeStatusTaskAsync } from './asyncActions';
export type { TTasksReducer, TTask } from '../entities';
export { taskCompletedReducer, setSortTasksCompleted, taskUpdate, resetPagination } from './slice';
export { getPagination, getTasks, getStatus, getError, isLoadingStatus, getSortTasksCompleted } from './selectors';
