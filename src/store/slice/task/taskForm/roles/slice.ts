import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { TState, TStateData } from './entities';
import { rolesActions } from './actions';
import { addUserRole, removeUserRole } from './asyncActions';

const initialState = {
  data: null,
  error: null,
  status: RequestStatuses.IDLE,
} as TState;

const taskFormRolesSlice = createSlice({
  name: 'taskFormRoles',
  initialState,
  reducers: rolesActions,
  extraReducers: {
    [addUserRole.pending.type]: (state: TState) => ({
      ...state,
      status: RequestStatuses.LOADING,
      error: null,
    }),
    [addUserRole.fulfilled.type]: (
      state: TState,
      { payload: data }: PayloadAction<TStateData>,
    ) => ({
      ...state,
      status: RequestStatuses.SUCCESS,
      error: null,
      data,
    }),
    [addUserRole.rejected.type]: (
      state: TState,
      { payload: error }: PayloadAction<Error>,
    ) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      error,
    }),

    [removeUserRole.pending.type]: (state: TState) => ({
      ...state,
      status: RequestStatuses.LOADING,
      error: null,
    }),
    [removeUserRole.fulfilled.type]: (
      state: TState,
      { payload: data }: PayloadAction<TStateData>,
    ) => ({
      ...state,
      status: RequestStatuses.SUCCESS,
      error: null,
      data,
    }),
    [removeUserRole.rejected.type]: (
      state: TState,
      { payload: error }: PayloadAction<Error>,
    ) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      error,
    }),
  },
});

export const { setRoles } = taskFormRolesSlice.actions;
export const taskFormRolesReducer = taskFormRolesSlice.reducer;
const selectSelf = (state: any) => state;
export const taskFormRolesSelector = createSelector(selectSelf, (state: any) => state.data);
