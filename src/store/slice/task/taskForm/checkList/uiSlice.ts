import { createSlice } from '@reduxjs/toolkit';

type TUIChecklist = {
  isVisibleCreateChecklist: boolean,
  isVisibleCreateItemChecklist: boolean,
};

const initialState = {
  isVisibleCreateChecklist: false,
  isVisibleCreateItemChecklist: false,
} as TUIChecklist;

const UiSlice = createSlice({
  name: 'uiChecklist',
  initialState,
  reducers: {
    showFormCreateChecklist: (state) => {
      state.isVisibleCreateChecklist = true;
    },
    hiddenFormCreateChecklist: (state) => {
      state.isVisibleCreateChecklist = false;
    },
  },
});

export const {
  hiddenFormCreateChecklist,
  showFormCreateChecklist } = UiSlice.actions;

export const checklistUIReducer = UiSlice.reducer;
