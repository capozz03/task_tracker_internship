import { TTaskFormReducer } from 'store/slice/task/taskForm/data/initialState';
import { PayloadAction } from '@reduxjs/toolkit';

export const taskFormActions = {
  showTaskForm: (state: TTaskFormReducer) => {
    state.isVisibleForm = true;
    return state;
  },
  hiddenTaskForm: (state: TTaskFormReducer) => {
    state.isVisibleForm = false;
    state.task = null;
    return state;
  },
  setTitleFromTaskForm: (state: TTaskFormReducer, { payload: title }: PayloadAction<string>) => {
    state.task!.title = title;
    return state;
  },
};
