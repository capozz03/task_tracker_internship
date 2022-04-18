import { createSlice } from '@reduxjs/toolkit';
import { TTaskCheckList, TTaskProgress } from 'store/slice/task/entities';

type TCheckListSlice = {
  progress: TTaskProgress;
  check_lists?: TTaskCheckList[];
}

const initialState = {
  progress: {
    completed: 0,
    percent: 0,
    total: 0,
  },
} as TCheckListSlice;

export const checkListSlice = createSlice({
  name: 'checkList',
  initialState,
  reducers: {},
});

export const checklistDataReducer = checkListSlice.reducer;
