import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, TTaskFormReducer } from './initialState';
import { RequestStatuses } from '../../../../shared';
import { TTask } from '../entities';
import { getTaskByIdAsync } from './getTaskById';
import { taskFormActions } from './actions';

const taskFormSlice = createSlice({
  name: 'taskForm',
  initialState,
  reducers: taskFormActions,
  extraReducers: {
    [getTaskByIdAsync.pending.type]:
      (state: TTaskFormReducer) => ({
        ...state,
        status: RequestStatuses.LOADING,
      }),
    [getTaskByIdAsync.fulfilled.type]:
      (state : TTaskFormReducer, { payload: task }: PayloadAction<TTask>) => ({
        ...state,
        status: RequestStatuses.SUCCESS,
        task,
      }),
    [getTaskByIdAsync.rejected.type]:
      (state : TTaskFormReducer, { payload: error }: PayloadAction<Error>) => ({
        ...state,
        status: RequestStatuses.FAILURE,
        task: null,
        error,
      }),
  },
});

export const { setTitleFromTaskForm, showTaskForm, hiddenTaskForm } = taskFormSlice.actions;
export const taskFormReducer = taskFormSlice.reducer;
const selectSelf = (state: any) => state;
export const taskFormSelector = createSelector(selectSelf,
  (state: any) => state.taskForm);
