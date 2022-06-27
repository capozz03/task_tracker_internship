export { getTasksAsync, changeStatusTaskAsync } from './asyncActions';
export type { TTasksReducer, TTask } from '../entities';
export { taskCompletedReducer, setSortTasksCompleted, taskUpdate, resetPagination, setPaginationTasksCompleted } from './slice';
export { getPagination, getTasks, getStatus, getError, isLoadingStatus, getSortTasksCompleted } from './selectors';
