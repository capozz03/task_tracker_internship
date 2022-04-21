import { createSlice } from '@reduxjs/toolkit';
import { TStorageFiles } from 'store/slice/task/entities';

type TStorageFilesSlice = {
  storage_files?: TStorageFiles[];
}

const initialState = {
} as TStorageFilesSlice;

export const storageFilesSlice = createSlice({
  name: 'storageFiles',
  initialState,
  reducers: {},
});

export const storageFilesReducer = storageFilesSlice.reducer;
