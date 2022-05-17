import { TState } from './entities';
import { PayloadAction } from '@reduxjs/toolkit';

export const datesActions = {
  setDateStart: (
    state: TState,
    { payload: dateStart }: PayloadAction<string | null | undefined>,
  ) => {
    if (!state.data) state.data = {};
    state.data.start = dateStart;
    return state;
  },

  setDateStop: (
    state: TState,
    { payload: dateStop }: PayloadAction<string | null | undefined>,
  ) => {
    if (!state.data) state.data = {};
    state.data.stop = dateStop;
    return state;
  },
};
