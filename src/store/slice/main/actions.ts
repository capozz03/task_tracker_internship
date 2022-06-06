import { PayloadAction } from '@reduxjs/toolkit';
import { TMainReducer, TTodoType } from './entities';

export const mainSliceActions = {
  addTodo(state: TMainReducer, { payload }: PayloadAction<TTodoType>) {
    return { ...state, todo: [payload, ...state.todo] };
  },
};
