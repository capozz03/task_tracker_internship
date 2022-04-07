import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { userService } from './cashboxService';

export const userAuthAsync = createAsyncThunk(
  'user/userAuth',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await userService.generateToken(id);
      return data;
    } catch (error) {
      message.error('Пользователя с таким логином не существует');
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
