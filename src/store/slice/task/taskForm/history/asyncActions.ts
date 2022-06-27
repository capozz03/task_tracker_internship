import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { historyService } from './services';
import { alert } from 'shared/ui';
import { TTaskHistoryProps } from './entities';

export const getTaskHistoryAsync = createAsyncThunk(
  'history/getTaskHistoryAsync',
  async (props: TTaskHistoryProps, { rejectWithValue }) => {
    try {
      const { data } = await historyService.getHistoryOnTask(props);
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось получить историю действий. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
