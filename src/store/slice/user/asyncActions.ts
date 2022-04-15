import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from './cashboxService';
import { alert } from 'shared/ui';

export const userAuthAsync = createAsyncThunk(
  'user/userAuth',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await userService.generateToken(id);
      return { userId: id, data };
    } catch (error) {
      alert('Пользователя с таким логином не существует', 'error');
      return rejectWithValue(error);
    }
  },
);

export const getUserInfoAsync = createAsyncThunk(
  'user/getUserInfo',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await userService.getUserInfo(id);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
