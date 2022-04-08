import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskService } from './taskInboxService';
import { TTaskSearch, TTasksReducer, TTaskStatusChange } from '../entities';

export const getTasksAsync = createAsyncThunk(
  'taskInbox/getTask',
  async (params: TTaskSearch, { rejectWithValue }) => {
    try {
      const { data } = await taskService.getTasks({ ...params, status_id: 'cbb7199e-cb25-4dce-bf4e-24a8a5e07ef2' });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const changeStatusTaskAsync = createAsyncThunk(
  'taskInbox/getTask',
  async (params: TTaskStatusChange, { rejectWithValue, dispatch, getState }) => {
    try {
      const { taskInbox } = getState() as { taskInbox: TTasksReducer };
      await taskService.changeStatusTask({ ...params });
      dispatch(getTasksAsync({
        per_page: taskInbox.pagination?.per_page,
        page: taskInbox.pagination?.page_current,
      }));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
