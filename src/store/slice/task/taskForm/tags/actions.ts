import { TTagsTask } from 'store/slice/task/entities';
import { TState } from './entities';
import { PayloadAction } from '@reduxjs/toolkit';

export const tagsActions = {
  setTags: (
    state: TState,
    { payload: tags }: PayloadAction<TTagsTask[]>,
  ) => {
    state.data = tags;
    return state;
  },
};
