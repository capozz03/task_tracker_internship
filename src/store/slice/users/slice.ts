import { TUsersState, TUsersStateData } from './entities';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { usersSliceActions } from './actions';
import { getUsersListPage } from './asyncActions';

const initialState = {
  data: null,
  status: RequestStatuses.IDLE,
  error: null,
} as TUsersState;

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: usersSliceActions,
  extraReducers: {
    [getUsersListPage.pending.type]: (state: TUsersState) => ({
      ...state, status: RequestStatuses.LOADING, error: null,
    }),
    [getUsersListPage.fulfilled.type]:
    (state: TUsersState, { payload }: PayloadAction<TUsersStateData>) => {
      const newState: TUsersState = { ...state, status: RequestStatuses.SUCCESS, error: null };

      if (state.data) {
        const { data, ...tail } = payload;
        newState.data = { ...tail, data: [...state.data.data, ...data] };
      } else {
        newState.data = payload;
      }

      return newState;
    },
    [getUsersListPage.rejected.type]: (state: TUsersState, { payload }: PayloadAction<Error>) => ({
      ...state, status: RequestStatuses.FAILURE, error: payload,
    }),
  },
});

export const usersReducer = usersSlice.reducer;
export const { resetUserList } = usersSlice.actions;
