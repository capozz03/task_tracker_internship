import { RequestStatuses } from 'shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFilterAssignedTo } from 'features/Tasks/tasksComponents/FilterAssignedTo/constants';

const initialState = {
  assignedToMe: 'all',
  status: RequestStatuses.IDLE,
  error: null,
};

const filterAssignedToSlice = createSlice({
  name: 'filterAssignedTo',
  initialState,
  reducers: {
    setFilterAssignedTo(state, { payload }: PayloadAction<keyof typeof TFilterAssignedTo>) {
      state.assignedToMe = payload;
      return state;
    },
  },
  extraReducers: {},
});

export const { setFilterAssignedTo } = filterAssignedToSlice.actions;
export const filterAssignedToReducer = filterAssignedToSlice.reducer;
