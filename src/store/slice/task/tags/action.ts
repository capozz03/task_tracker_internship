import { TTagFilterSlice } from 'store/slice/task/tags/entities';
import { PayloadAction } from '@reduxjs/toolkit';
import { TTag } from 'store/slice/task/entities';

export default {
  setCurrentTag(state: TTagFilterSlice, { payload }: PayloadAction<TTag>) {
    state.currentTag = payload;
  },
  clearCurrentTag(state: TTagFilterSlice) {
    state.currentTag = null;
  },
};
