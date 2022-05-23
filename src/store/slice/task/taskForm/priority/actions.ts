import { TState, TPriorityStateData } from './entities';
import { PayloadAction } from '@reduxjs/toolkit';

export const priorityActions = {
  setPriority: (
    state: TState,
    { payload: priority }: PayloadAction<TPriorityStateData | null>,
  ) => {
    state.data = priority;
    return state;
  },
};
