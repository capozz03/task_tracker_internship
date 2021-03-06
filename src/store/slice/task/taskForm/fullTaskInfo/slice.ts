import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, TTaskFormReducer } from 'store/slice/task/taskForm/fullTaskInfo/initialState';
import { RequestStatuses } from 'shared';
import { TTaskItemResponse } from 'store/slice/task/entities';
import { getTaskByIdAsync } from 'store/slice/task/taskForm/getTaskById';
import { taskFormActions } from 'store/slice/task/taskForm/fullTaskInfo/actions';

const taskFormSlice = createSlice({
  name: 'taskForm',
  initialState,
  reducers: taskFormActions,
  extraReducers: {
    [getTaskByIdAsync.pending.type]: (state: TTaskFormReducer) => ({
      ...state,
      status: RequestStatuses.LOADING,
    }),
    [getTaskByIdAsync.fulfilled.type]: (
      state: TTaskFormReducer,
      { payload: task }: PayloadAction<TTaskItemResponse>,
    ) => ({
      ...state,
      status: RequestStatuses.SUCCESS,
      task: task.data,
    }),
    [getTaskByIdAsync.rejected.type]: (
      state: TTaskFormReducer,
      { payload: error }: PayloadAction<Error>,
    ) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      task: null,
      error,
    }),
  },
});

export const { setTitleFromTaskForm,
  showTaskForm,
  hiddenTaskForm,
  changeStatusItemForChecklistTaskForm,
  pushItemForCheckList,
  removeItemFromCheckList,
  updateTask,
  setDescriptionFromTaskForm,
  updateCheckList,
  swapItemInChecklist,
  setStatusTaskForm,
} = taskFormSlice.actions;
export const taskFormDataReducer = taskFormSlice.reducer;
export const taskFormReducer = taskFormSlice.reducer;
const selectSelf = (state: any) => state;
export const taskFormSelector = createSelector(selectSelf, (state: any) => state.taskForm);
