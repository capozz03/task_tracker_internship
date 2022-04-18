import { TTaskFormReducer } from './initialState';
import { PayloadAction } from '@reduxjs/toolkit';

export const taskFormActions = {
  showTaskForm: (state: TTaskFormReducer) => ({
    ...state,
    isVisibleForm: true,
  }),
  hiddenTaskForm: (state: TTaskFormReducer) => ({
    ...state,
    isVisibleForm: false,
  }),
  setTitleFromTaskForm: (state: TTaskFormReducer, { payload: title }: PayloadAction<string>) => {
    state.task!.title = title;
    return state;
  },
  setDescriptionFromTaskForm: (
    state: TTaskFormReducer,
    { payload: description }: PayloadAction<string>,
  ) => {
    state.task!.description = description;
    return state;
  },
};
