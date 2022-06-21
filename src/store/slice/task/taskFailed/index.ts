export { getTasksAsync, changeStatusTaskAsync } from './asyncActions';
export type { TTasksReducer, TTask } from '../entities';
export { taskFailedReducer, setSortTasksFailed, taskUpdate, resetPagination } from './slice';
export { getPagination, getTasks, getStatus, getError, isLoadingStatus, getSortTasksFailed } from './selectors';
