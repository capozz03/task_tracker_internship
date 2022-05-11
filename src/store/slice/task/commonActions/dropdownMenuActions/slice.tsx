import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTask } from 'store/slice/task/entities';
import { RequestStatuses } from '../../../../../shared';
import { deleteTaskAsync } from './asyncActions';
// import { deleteTaskAsync } from './asyncActions';

type TCommonActionReducer = {
  visibleModalDeleteTask: boolean;
  task: TTask | null;
  status: RequestStatuses;
}

const initialState = {
  visibleModalDeleteTask: false,
  task: null,
  status: RequestStatuses.IDLE,
} as TCommonActionReducer;

const dropdownMenuTaskSlice = createSlice({
  name: 'commonActionSlice',
  initialState,
  reducers: {
    setTask: (state, { payload }: PayloadAction<TTask>) => {
      state.task = payload;
    },
    showModalForDeleteTask: (state, { payload }: PayloadAction<TTask>) => {
      state.task = payload;
      state.visibleModalDeleteTask = true;
    },
    clearState: (state) => {
      state = initialState;
      return state;
    },
  },
  extraReducers: {
    [deleteTaskAsync.pending.type]: (state) => {
      state.status = RequestStatuses.LOADING;
    },
    [deleteTaskAsync.fulfilled.type]: (state) => {
      state.status = RequestStatuses.SUCCESS;
    },
    [deleteTaskAsync.rejected.type]: (state) => {
      state.status = RequestStatuses.FAILURE;
    },
  },
});

export const commonActionReducer = dropdownMenuTaskSlice.reducer;
export const { setTask, showModalForDeleteTask, clearState } = dropdownMenuTaskSlice.actions;
