import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from './cashboxService';

export const userAuthAsync = createAsyncThunk(
  'user/userAuth',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await userService.generateToken(id);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
