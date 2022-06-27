import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { TStorageFiles } from 'store/slice/task/entities';
import { createStorageFile } from './asyncActions';

type TStorageFilesSlice = {
  storage_files?: TStorageFiles[];
  status: RequestStatuses;
  error: Error | null;
};

const initialState = {
  status: RequestStatuses.IDLE,
  error: null,
} as TStorageFilesSlice;

export const storageFilesSlice = createSlice({
  name: 'storageFiles',
  initialState,
  reducers: {},
  extraReducers: {
    [createStorageFile.pending.type]: (state: TStorageFilesSlice) => ({
      ...state,
      status: RequestStatuses.LOADING,
    }),
    [createStorageFile.fulfilled.type]: (state: TStorageFilesSlice) => ({
      ...state,
      status: RequestStatuses.SUCCESS,
    }),
    [createStorageFile.rejected.type]: (
      state: TStorageFilesSlice,
      { payload: error }: PayloadAction<Error>,
    ) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      error,
    }),
  },
});

export const storageFilesDataReducer = storageFilesSlice.reducer;
