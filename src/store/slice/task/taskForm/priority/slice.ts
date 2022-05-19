import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { TPriorityStateData, TState } from './entities';
import { priorityActions } from './actions';
import { changeTaskPriority } from './asyncActions';

const initialState = {
  data: null,
  error: null,
  status: RequestStatuses.IDLE,
} as TState;

const taskFormPrioritySlice = createSlice({
  name: 'taskFormPriority',
  initialState,
  reducers: priorityActions,
  extraReducers: {
    [changeTaskPriority.pending.type]: (state: TState) => ({
      ...state,
      status: RequestStatuses.LOADING,
      error: null,
    }),
    [changeTaskPriority.fulfilled.type]: (
      state: TState,
      { payload: data }: PayloadAction<TPriorityStateData>,
    ) => ({
      ...state,
      status: RequestStatuses.SUCCESS,
      error: null,
      data,
    }),
    [changeTaskPriority.rejected.type]: (
      state: TState,
      { payload: error }: PayloadAction<Error>,
    ) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      error,
    }),
  },
});

export const { setPriority } = taskFormPrioritySlice.actions;
export const taskFormPriorityReducer = taskFormPrioritySlice.reducer;
const selectSelf = (state: any) => state;
export const taskFormPrioritySelector = createSelector(selectSelf, (state: any) => state.data);
