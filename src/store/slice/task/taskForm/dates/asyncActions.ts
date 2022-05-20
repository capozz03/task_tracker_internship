import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { datesService } from './services';
import { TaskFormSlice } from 'store/slice';
import { alert } from 'shared/ui';
import { TRequestParams, TRequestParamsDeleteDate, TRequestParamsDoubleDate } from './entities';

export const changeTaskDateStart = createAsyncThunk(
  'dates/changeTaskDateStart',
  async (props: TRequestParams, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await datesService.changeTaskDateStart(props);

      if (props.datetimeISO) alert('Дата начала установлена', 'success');
      else alert('Дата начала удалена', 'success');

      dispatch(TaskFormSlice.updateTask(data.data));
      return data.data.exec_start;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось изменить дату начала. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

export const changeTaskDateStop = createAsyncThunk(
  'dates/changeTaskDateStop',
  async (props: TRequestParams, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await datesService.changeTaskDateStop(props);

      if (props.datetimeISO) alert('Срок выполнения установлен', 'success');
      else alert('Срок выполнения удален', 'success');

      dispatch(TaskFormSlice.updateTask(data.data));
      return data.data.exec_stop;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось изменить срок выполнения. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

export const changeTaskDates = createAsyncThunk(
  'dates/changeTaskDates',
  async ({ taskId, datetimesISO }: TRequestParamsDoubleDate, { rejectWithValue }) => {
    try {
      await datesService.changeTaskDateStart({
        taskId,
        datetimeISO: datetimesISO[0],
      });

      if (datetimesISO[0]) alert('Дата начала установлена', 'success');
      else alert('Дата начала удалена', 'success');

      await datesService.changeTaskDateStop({
        taskId,
        datetimeISO: datetimesISO[1],
      });

      if (datetimesISO[1]) alert('Срок выполнения установлен', 'success');
      else alert('Срок выполнения удален', 'success');
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось изменить даты. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

export const deleteTaskDates = createAsyncThunk(
  'dates/deleteTaskDates',
  async ({ taskId }: TRequestParamsDeleteDate, { rejectWithValue }) => {
    try {
      await datesService.changeTaskDateStart({
        taskId,
        datetimeISO: null,
      });
      alert('Дата начала удалена', 'success');

      await datesService.changeTaskDateStop({
        taskId,
        datetimeISO: null,
      });
      alert('Срок выполнения удален', 'success');
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось удалить даты. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
