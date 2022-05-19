import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { TaskFailedSlice } from 'store/slice';
import { getTaskByIdAsync } from '../getTaskById/getTaskByIdAsyncAction';
import { TFormResultChangeProps } from './entities';
import { formResultChangeService } from './services';
import { alert } from 'shared/ui';

export const setFormResult = createAsyncThunk(
  'formResultChangeService/setFormResult',
  async (
    { form_result: { taskId, resume, formResult } }: TFormResultChangeProps,
    { rejectWithValue, dispatch },
  ) => {
    try {
      const { data } = await formResultChangeService(taskId, formResult);
      if (resume === 'Переделать срочно' || resume === 'Задача отклонена') {
        dispatch(
          TaskFailedSlice.changeStatusTaskAsync({
            task_id: taskId,
            task_status_id: '599f5d03-1ef0-4a5b-a18c-33a4f44c4610',
          }),
        );
      }
      dispatch(getTaskByIdAsync(taskId));
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось оставить резюме. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
