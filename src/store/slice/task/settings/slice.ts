import { createSlice } from '@reduxjs/toolkit';
import { TSettingsState } from './entities';
import { settingsActions } from './actions';

const initialState: TSettingsState = {
  pagination: {},
  sort: {},
  filters: {},
};

const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,
  reducers: settingsActions,
});

export const settingsReducer = settingsSlice.reducer;
export const { setPagination, setSort, setFilterAssignTo } = settingsSlice.actions;
