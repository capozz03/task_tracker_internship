/* eslint-disable no-unreachable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { mainService } from './cashboxSetvice';

export const getPostsAsync = createAsyncThunk(
  'main/getPosts',
  async (_: void, { rejectWithValue }) => {
    try {
      const { data } = await mainService.getPosts();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
