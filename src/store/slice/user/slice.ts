import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { TUserState, TAuthResponse } from './entities';
import { userAuthAsync } from './asyncActions';

const initialState = {
  token: null,
  status: RequestStatuses.IDLE,
  error: null,
} as TUserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [userAuthAsync.pending.type]: (state) => ({
      ...state,
      status: RequestStatuses.LOADING,
    }),
    [userAuthAsync.fulfilled.type]: (state, { payload: token }: PayloadAction<TAuthResponse>) => ({
      ...state,
      status: RequestStatuses.SUCCESS,
      token,
    }),
    [userAuthAsync.rejected.type]: (state, { payload: error }: PayloadAction<Error>) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      token: null,
      error,
    }),
  },
});

export const userReducer = userSlice.reducer;
