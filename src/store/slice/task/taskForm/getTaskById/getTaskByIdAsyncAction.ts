import { hasRole } from 'shared/helpers';
import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { getTaskById } from './getTaskByIdServices';
import { TaskFormSlice } from 'store/slice';
import { alert } from 'shared/ui';

export const getTaskByIdAsync = createAsyncThunk(
  'taskForm/getTaskByIdAsync',
  async (taskId:string, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await getTaskById(taskId);

      if (!hasRole('anything', data.data.roles)) {
        alert('У вас недостаточно прав для просмотра этой задачи', 'error');
        return rejectWithValue('Недостаточно прав для просмотра задачи');
      }

      dispatch(TaskFormSlice.showTaskForm());
      dispatch(TaskFormSlice.setRoles(data.data.roles));
      dispatch(TaskFormSlice.setPriority(data.data.priority));
      dispatch(TaskFormSlice.setDateStart(data.data.exec_start));
      dispatch(TaskFormSlice.setDateStop(data.data.exec_stop));
      dispatch(TaskFormSlice.setTags(data.data.tags));

      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось загрузить задачу. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
