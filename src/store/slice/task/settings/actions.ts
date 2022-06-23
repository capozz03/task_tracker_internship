import { PayloadAction } from '@reduxjs/toolkit';
import { TActionSetPagination, TActionSetSort, TSettingsState } from './entities';

export const settingsActions = {

  setPagination: (
    state: TSettingsState,
    { payload }: PayloadAction<TActionSetPagination>,
  ) => {
    const { listName, pagination } = payload;
    state.pagination[listName] = pagination || undefined;
  },

  setSort: (
    state: TSettingsState,
    { payload }: PayloadAction<TActionSetSort>,
  ) => {
    const { listName, sort } = payload;
    state.sort[listName] = sort || undefined;
  },

};
