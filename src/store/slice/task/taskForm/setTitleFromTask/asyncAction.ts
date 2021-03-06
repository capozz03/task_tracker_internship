import { createAsyncThunk } from '@reduxjs/toolkit';
import { setTitle } from './service';
import { TaskCompletedSlice, TaskFailedSlice, TaskFormSlice, TaskInboxSlice, TaskInWorkSlice } from 'store/slice';

type changeTitleTaskProps = {
  data: {
    taskId: string,
    title: string,
  },
  successHandle: () => void,
  errorHandle: () => void,
}

export const setTitleAsync = createAsyncThunk(
  'taskForm/setTitleAsync',
  async ({
    data: { title, taskId },
    successHandle,
    errorHandle } :changeTitleTaskProps, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await setTitle(taskId, title);
      successHandle();
      dispatch(TaskFormSlice.setTitleFromTaskForm(data.data.title));
      if (data.data.status.name === 'Создана') {
        dispatch(TaskInboxSlice.taskUpdate(data.data));
      }
      if (data.data.status.name === 'В работе') {
        dispatch(TaskInWorkSlice.taskUpdate(data.data));
      }
      if (data.data.status.name === 'Выполнена') {
        dispatch(TaskCompletedSlice.taskUpdate(data.data));
      }
      if (data.data.status.name === 'Не выполнена') {
        dispatch(TaskFailedSlice.taskUpdate(data.data));
      }
      dispatch(TaskFormSlice.resetTaskHistory());
      return data;
    } catch (error) {
      errorHandle();
      return rejectWithValue(error);
    }
  },
);
