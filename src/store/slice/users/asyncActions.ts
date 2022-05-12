import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { userService } from './cashboxService';
import { alert } from 'shared/ui';

type TUsersListRequest = {
  page: number;
  limit: number;
  search?: string;
}

export const getUsersListPage = createAsyncThunk(
  'users/getUsersListPage',
  async ({ page, limit, search = '' }: TUsersListRequest, { rejectWithValue }) => {
    try {
      const { data } = await userService.getUsers(page, limit, search);
      return data;
    } catch (error) {
      alert('Произошла ошибка при загрузке пользователей', 'error');
      const serializedError = miniSerializeError(error);
      return rejectWithValue(serializedError);
    }
  },
);
