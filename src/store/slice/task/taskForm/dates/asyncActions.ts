import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { datesService } from './services';
import { TaskCompletedSlice, TaskFailedSlice, TaskFormSlice, TaskInboxSlice, TaskInWorkSlice } from 'store/slice';
import { alert } from 'shared/ui';
import { TRequestParams } from './entities';
import { updateTaskLists } from 'shared/helpers';

export const changeTaskDateStart = createAsyncThunk(
  'dates/changeTaskDateStart',
  async (props: TRequestParams, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await datesService.changeTaskDateStart(props);

      if (props.datetimeISO) alert('Дата начала установлена', 'success');
      else alert('Дата начала удалена', 'success');

      dispatch(TaskFormSlice.updateTask(data.data));

      const state = getState();
      updateTaskLists({
        dispatch,
        status: data.data.status.name,
        state,
        slices: {
          TaskInboxSlice,
          TaskInWorkSlice,
          TaskCompletedSlice,
          TaskFailedSlice,
        },
      });

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
  async (props: TRequestParams, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await datesService.changeTaskDateStop(props);

      if (props.datetimeISO) alert('Срок выполнения установлен', 'success');
      else alert('Срок выполнения удален', 'success');

      const state = getState();
      updateTaskLists({
        dispatch,
        status: data.data.status.name,
        state,
        slices: {
          TaskInboxSlice,
          TaskInWorkSlice,
          TaskCompletedSlice,
          TaskFailedSlice,
        },
      });

      dispatch(TaskFormSlice.updateTask(data.data));
      return data.data.exec_stop;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось изменить срок выполнения. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
