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
    showFormCreateItemChecklist: (state) => {
      state.isVisibleCreateItemChecklist = true;
    },
    hiddenFormCreateChecklist: (state) => {
      state.isVisibleCreateChecklist = false;
    },
    hiddenFormCreateItemChecklist: (state) => {
      state.isVisibleCreateItemChecklist = false;
    },
  },
});

export const {
  hiddenFormCreateChecklist,
  hiddenFormCreateItemChecklist,
  showFormCreateChecklist,
  showFormCreateItemChecklist } = UiSlice.actions;

export const checklistUIReducer = UiSlice.reducer;
