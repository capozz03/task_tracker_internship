import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTaskCheckList, TTaskProgress } from 'store/slice/task/entities';
import { RequestStatuses } from 'shared';
import { changePositionItemForChecklist } from 'store/slice/task/taskForm/checkList/asyncActions';

type TCheckListSlice = {
  progress: TTaskProgress;
  check_lists?: TTaskCheckList[];
  status: RequestStatuses
  error: null | Error;
}

const initialState = {
  progress: {
    completed: 0,
    percent: 0,
    total: 0,
  },
  status: RequestStatuses.IDLE,
  error: null,
} as TCheckListSlice;

export const checkListSlice = createSlice({
  name: 'checkList',
  initialState,
  reducers: {},
  extraReducers: {
    [changePositionItemForChecklist.pending.type]: (state) => ({
      ...state,
      status: RequestStatuses.LOADING,
    }),
    [changePositionItemForChecklist.fulfilled.type]:
      (state) => ({
        ...state,
        status: RequestStatuses.SUCCESS,
      }),
    [changePositionItemForChecklist.rejected.type]:
      (state, { payload: error }: PayloadAction<Error>) => ({
        ...state,
        status: RequestStatuses.FAILURE,
        error,
      }),
  },
});

export const checklistDataReducer = checkListSlice.reducer;
