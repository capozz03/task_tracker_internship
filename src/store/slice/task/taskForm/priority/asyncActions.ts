import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { priorityService } from './services';
import { TaskFormSlice } from 'store/slice';
import { alert } from 'shared/ui';
import { TRequestChangePriorityProps } from './entities';

export const changeTaskPriority = createAsyncThunk(
  'priority/changeTaskPriority',
  async (props: TRequestChangePriorityProps, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await priorityService.changeTaskPriority(props);
      alert('Приоритет успешно изменен', 'success');
      dispatch(TaskFormSlice.updateTask(data.data));
      return data.data.priority;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось изменить приоритет. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
