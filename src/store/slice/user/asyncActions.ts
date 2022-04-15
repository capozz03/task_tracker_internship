import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
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
      const serializedError = miniSerializeError(error);
      return rejectWithValue(serializedError);
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
      alert('Не удалось получить данные о пользователе', 'error');
      const serializedError = miniSerializeError(error);
      return rejectWithValue(serializedError);
    }
  },
);
