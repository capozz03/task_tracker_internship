import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TUIStorageFiles= {
  isVisibleStorageFiles: boolean,
  imagePreview: string,
  progress: number,
};

const initialState = {
  isVisibleStorageFiles: false,
  imagePreview: 'https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg',
  progress: 0,
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
    setProgress: (state, { payload }: PayloadAction<number>) => {
      state.progress = payload;
    },
  },
});

export const {
  hiddenFormStorageFiles,
  showFormStorageFiles,
  setProgress,
} = UiSlice.actions;

export const storageFilesUIReducer = UiSlice.reducer;
