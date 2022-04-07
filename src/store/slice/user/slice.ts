import { TUser } from 'store/slice/user/entities';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses, clientCookies } from 'shared';
import { TUserState, TAuthResponse } from './entities';
import { userSliceActions } from './actions';
import { userAuthAsync, getUserInfoAsync } from './asyncActions';

const initialState = {
  token: clientCookies.getToken() || null,
  status: RequestStatuses.IDLE,
  error: null,
} as TUserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: userSliceActions,
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

    [getUserInfoAsync.pending.type]: (state) => ({
      ...state,
      status: RequestStatuses.LOADING,
      error: null,
    }),
    [getUserInfoAsync.fulfilled.type]: (state, { payload }: PayloadAction<TUser>) => ({
      ...state,
      status: RequestStatuses.SUCCESS,
      userInfo: payload,
    }),
    [getUserInfoAsync.rejected.type]: (state, { payload: error }: PayloadAction<Error>) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      error,
    }),
  },
});

export const userReducer = userSlice.reducer;
export const { logoutUser } = userSlice.actions;
