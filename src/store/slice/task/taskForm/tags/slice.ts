import { TTagsTask } from 'store/slice/task/entities';
import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { TState } from './entities';
import { tagsActions } from './actions';
import { addTagToTask, removeTagToTask } from './asyncActions';

const initialState = {
  data: null,
  status: RequestStatuses.IDLE,
  error: null,
} as TState;

const taskFormTagsSlice = createSlice({
  name: 'taskFormTags',
  initialState,
  reducers: tagsActions,
  extraReducers: {
    [addTagToTask.pending.type]: (state: TState) => ({
      ...state,
      status: RequestStatuses.LOADING,
      error: null,
    }),
    [addTagToTask.fulfilled.type]: (
      state: TState,
      { payload: tags }: PayloadAction<TTagsTask[]>,
    ) => ({
      ...state,
      data: tags,
      status: RequestStatuses.SUCCESS,
      error: null,
    }),
    [addTagToTask.rejected.type]: (
      state: TState,
      { payload: error }: PayloadAction<Error>,
    ) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      error,
    }),

    [removeTagToTask.pending.type]: (state: TState) => ({
      ...state,
      status: RequestStatuses.LOADING,
      error: null,
    }),
    [removeTagToTask.fulfilled.type]: (
      state: TState,
      { payload: tags }: PayloadAction<TTagsTask[]>,
    ) => ({
      ...state,
      data: tags,
      status: RequestStatuses.SUCCESS,
      error: null,
    }),
    [removeTagToTask.rejected.type]: (
      state: TState,
      { payload: error }: PayloadAction<Error>,
    ) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      error,
    }),
  },
});

export const taskFormTagsReducer = taskFormTagsSlice.reducer;
export const { setTags } = taskFormTagsSlice.actions;
const selectSelf = (state: any) => state;
export const taskFormTagsSelector = createSelector(selectSelf, (state: any) => state.data);
