import { combineReducers } from '@reduxjs/toolkit';
import { storageFilesDataReducer } from './slice';
import { storageFilesUIReducer } from './uiSlice';

export {
  createStorageFile,
  getStorageFileDetails,
  uploadStorageFile,
  downloadStorageFile,
  deleteStorageFile,
} from './asyncActions';

export const StorageFilesReducer = combineReducers({
  data: storageFilesDataReducer,
  ui: storageFilesUIReducer,
});
