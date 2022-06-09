import { updateTaskLists } from 'shared/helpers/updateTaskLists';
import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { priorityService } from './services';
import { TaskFormSlice, TaskInboxSlice, TaskInWorkSlice, TaskCompletedSlice, TaskFailedSlice } from 'store/slice';
import { alert } from 'shared/ui';
import { TRequestChangePriorityProps } from './entities';

export const changeTaskPriority = createAsyncThunk(
  'priority/changeTaskPriority',
  async (props: TRequestChangePriorityProps, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await priorityService.changeTaskPriority(props);
      alert('Приоритет успешно изменен', 'success');

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
      dispatch(TaskFormSlice.resetTaskHistory());
      return data.data.priority;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось изменить приоритет. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
