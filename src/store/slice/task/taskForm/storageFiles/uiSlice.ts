import { createSlice } from '@reduxjs/toolkit';

type TUIStorageFiles= {
  isVisibleStorageFiles: boolean,
};

const initialState = {
  isVisibleStorageFiles: false,
} as TUIStorageFiles;

const UiSlice = createSlice({
  name: 'uiStorageFiles',
  initialState,
  reducers: {
    showFormStorageFiles: (state) => {
      state.isVisibleStorageFiles = true;
    },
    hiddenFormStorageFiles: (state) => {
      state.isVisibleStorageFiles = false;
    },
  },
});

export const {
  hiddenFormStorageFiles,
  showFormStorageFiles } = UiSlice.actions;

export const storageFilesUIReducer = UiSlice.reducer;
