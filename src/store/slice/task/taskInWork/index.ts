export { getTasksAsync, createNewTaskAsync, changeStatusTaskAsync } from './asyncActions';
export type { TTasksReducer } from '../entities';
export { taskInWorkReducer, taskUpdate, setSortTasksInWork, resetPagination, setPaginationTasksInWork } from './slice';
export { getPagination, getTasks, getStatus, getError, isLoadingStatus, getSortTasksInWork } from './selectors';
