import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { tagsService } from './services';
import { TaskCompletedSlice, TaskFailedSlice, TaskFormSlice, TaskInboxSlice, TaskInWorkSlice } from 'store/slice';
import { alert } from 'shared/ui';
import { TRequestParams } from './entities';
import { updateTaskLists } from 'shared/helpers';

export const addTagToTask = createAsyncThunk(
  'tags/addTagToTask',
  async (props: TRequestParams, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await tagsService.addTagToTask(props);
      alert('Метка добавлена', 'success');
      dispatch(TaskFormSlice.updateTask(data.data));
      dispatch(TaskFormSlice.resetTaskHistory());

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

      return data.data.tags;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось добавить метку. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

export const removeTagToTask = createAsyncThunk(
  'tags/removeTagToTask',
  async (props: TRequestParams, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await tagsService.removeTagToTask(props);
      alert('Метка удалена', 'success');
      dispatch(TaskFormSlice.updateTask(data.data));
      dispatch(TaskFormSlice.resetTaskHistory());

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

      return data.data.tags;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось удалить метку. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
