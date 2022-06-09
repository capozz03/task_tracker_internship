import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { TaskFormSlice, TaskCompletedSlice } from 'store/slice';
import { getTaskByIdAsync } from '../getTaskById/getTaskByIdAsyncAction';
import { TFormResultChangeProps } from './entities';
import { formResultChangeService } from './services';
import { alert } from 'shared/ui';
import { TaskStatuses } from 'shared';

const statusIdFailed = TaskStatuses.FAILED;

export const setFormResult = createAsyncThunk(
  'formResultChangeService/setFormResult',
  async (
    { form_result: { taskId, formResult } }: TFormResultChangeProps,
    { rejectWithValue, dispatch },
  ) => {
    try {
      const { data } = await formResultChangeService(taskId, formResult);
      const formResultResume = formResult && formResult.length && formResult[0].value;
      if (formResultResume === 'Переделать срочно' || formResultResume === 'Задача отклонена') {
        dispatch(TaskCompletedSlice.changeStatusTaskAsync({
          task_id: taskId,
          task_status_id: statusIdFailed,
        }));
      }
      dispatch(getTaskByIdAsync(taskId));
      dispatch(TaskFormSlice.resetTaskHistory());
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось оставить резюме. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
