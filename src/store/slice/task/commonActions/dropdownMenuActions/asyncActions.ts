import { createAsyncThunk } from '@reduxjs/toolkit';
import { TTasksReducer } from '../../entities';
import { getTasksAsync } from '../../taskInWork';
import { taskService } from '../../taskInWork/taskInWorkService';

export const duplicateTaskAsync = createAsyncThunk(
  'taskInWork/duplicateTask',
  async (taskId: string,
    { rejectWithValue, dispatch, getState }) => {
    try {
      const { taskInWork } = getState() as { taskInWork: TTasksReducer };
      await taskService.duplicateTask(taskId);
      dispatch(getTasksAsync({
        per_page: taskInWork.pagination?.per_page,
        page: taskInWork.pagination?.page_current,
      }));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteTaskAsync = createAsyncThunk(
  'taskInWork/deleteTask',
  async (taskId: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const { taskInWork } = getState() as { taskInWork: TTasksReducer };
      await taskService.deleteTask(taskId);
      dispatch(getTasksAsync({
        per_page: taskInWork.pagination?.per_page,
        page: taskInWork.pagination?.page_current,
      }));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
