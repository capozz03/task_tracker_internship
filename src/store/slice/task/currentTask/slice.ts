import { createSelector, createSlice } from '@reduxjs/toolkit';
import { TTask } from '../entities';
import { RequestStatuses } from 'shared';
import { fullInfoExtraReducers, setTitleAsyncExtraReducer } from './extraReducers';

export type TCurrentTaskReducer = {
  task: TTask | null;
  status: RequestStatuses;
  error: null | Error;
};

const initialState = {
  task: {
    task_id: '',
    title: '',
    description: '',
    created: '',
    updated: '',
    status: {
      task_status_id: '',
      name: '',
      form_result_required: false,
    },
    priority: null,
    roles: [
      {
        task_to_role_id: '',
        task: {
          task_id: '',
        },
        task_role: {
          task_role_id: '',
          name: '',
          name_group: '',
          max_user_assigned: 0,
          is_author: false,
          created: '',
          updated: '',
        },
        assign_user: {
          user_id: 0,
          name: '',
        },
      },
    ],
    tags: [{
      task_to_tag_id: '',
      task: {
        task_id: '',
      },
      task_tag: {
        task_tag_id: '',
        name: '',
        color: '',
      },
    }],
    progress: null,
    storage_files_meta: {
      total: 0,
    },
    permissions: [
      '',
    ],
  },
  status: RequestStatuses.IDLE,
  error: null,
} as TCurrentTaskReducer;

const currentTaskSlice = createSlice({
  name: 'currentSlice',
  initialState,
  reducers: {},
  extraReducers: {
    ...fullInfoExtraReducers,
    ...setTitleAsyncExtraReducer,
  },
});

export const currentTaskReducer = currentTaskSlice.reducer;
const selectSelf = (state: any) => state;
export const currentTaskSelector = createSelector(selectSelf,
  (state: any) => state.currentTaskSlice);
