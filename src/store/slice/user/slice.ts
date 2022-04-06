import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses, clientCookies } from 'shared';
import { TUserState, TAuthResponse } from './entities';
import { userAuthAsync } from './asyncActions';

const initialState = {
  token: clientCookies.getToken() || null,
  status: RequestStatuses.IDLE,
  error: null,
} as TUserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [userAuthAsync.pending.type]: (state) => ({
      ...state,
      status: RequestStatuses.LOADING,
      error: null,
    }),
    [userAuthAsync.fulfilled.type]: (state, { payload }: PayloadAction<TAuthResponse>) => {
      clientCookies.setToken(payload.token);
      return {
        ...state,
        status: RequestStatuses.SUCCESS,
        token: payload.token,
        error: null,
      };
    },
    [userAuthAsync.rejected.type]: (state, { payload: error }: PayloadAction<Error>) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      token: null,
      error,
    }),
  },
});

export const userReducer = userSlice.reducer;
