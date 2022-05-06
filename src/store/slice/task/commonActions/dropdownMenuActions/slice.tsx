import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTask } from 'store/slice/task/entities';
// import { deleteTaskAsync } from './asyncActions';

type TCommonActionReducer = {
  visibleModalDeleteTask: boolean;
  task: TTask | null,
}

const initialState = {
  visibleModalDeleteTask: false,
  task: null,
} as TCommonActionReducer;

const dropdownMenuTaskSlice = createSlice({
  name: 'commonActionSlice',
  initialState,
  reducers: {
    setTask: (state, { payload }: PayloadAction<TTask>) => {
      state.task = payload;
    },
    // deleteTask: (state, { payload }: PayloadAction) => {
    //   deleteTaskAsync({
    //     // data: {
    //     //   // taskId,
    //     //   // taskStatusId,
    //     // },
    //     // resolvedHandle: deleteResolvedHandle,
    //     // rejectedHandle: deleteRejectedHandle,
    //   })
  },
});

export const commonActionReducer = dropdownMenuTaskSlice.reducer;
export const { setTask } = dropdownMenuTaskSlice.actions;
