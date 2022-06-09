import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDescription } from './service';
import { TaskFormSlice, TaskInWorkSlice } from 'store/slice';

type changeDescriptionTaskProps = {
  data: {
    taskId: string,
    description: string,
  },
  successHandle: () => void,
  errorHandle: () => void,
}

export const setDescriptionAsync = createAsyncThunk(
  'taskForm/setDescriptionAsync',
  async ({
    data: { description, taskId },
    successHandle,
    errorHandle } :changeDescriptionTaskProps, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await setDescription(taskId, description);
      successHandle();
      dispatch(TaskFormSlice.setDescriptionFromTaskForm(data.data.description));
      if (data.data.status.name === 'Создана') {
        // dispatch();
        console.log('Создана');
      }
      if (data.data.status.name === 'В работе') {
        dispatch(TaskInWorkSlice.taskUpdate(data.data));
      }
      if (data.data.status.name === 'Выполнена' || data.data.status.name === 'Не выполнена') {
        // dispatch();
        console.log('Выполнена');
      }
      dispatch(TaskFormSlice.resetTaskHistory());
      return data;
    } catch (error) {
      errorHandle();
      return rejectWithValue(error);
    }
  },
);
