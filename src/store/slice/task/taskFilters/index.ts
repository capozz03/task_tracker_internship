import { combineReducers } from '@reduxjs/toolkit';
import { filterAssignedToReducer } from './filterAssignedTo';

export {
  filterAssignedToReducer,
  getFilterAssignedTo,
  setFilterAssignedTo,
} from './filterAssignedTo';

export const taskFiltersReducer = combineReducers({
  assignedTo: filterAssignedToReducer,
});
