import { TUser } from 'store/slice/user/entities';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses, clientCookies } from 'shared';
import { TUserState, TAuthResponse } from './entities';
import { userSliceActions } from './actions';
import { userAuthAsync, getUserInfoAsync } from './asyncActions';

const initialState = {
  userId: clientCookies.getUserId() || null,
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
      clientCookies.setToken(payload.data.token);
      clientCookies.setUserId(payload.userId);
      return {
        ...state,
        status: RequestStatuses.SUCCESS,
        error: null,
        userId: payload.userId,
        token: payload.data.token,
      };
    },
    [userAuthAsync.rejected.type]: (state, { payload: error }: PayloadAction<Error>) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      error,
      token: null,
      userId: null,
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
