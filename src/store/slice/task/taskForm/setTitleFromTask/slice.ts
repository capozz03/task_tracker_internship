import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setTitleAsync } from './asyncAction';
import { RequestStatuses } from 'shared';
import { TTask } from '../../entities';

type TTaskFormTitleReducer = {
  title: string | null,
  status: RequestStatuses,
  error: Error | null,
}

const initialState = {
  title: '',
  status: RequestStatuses.IDLE,
  error: null,
} as TTaskFormTitleReducer;

const titleSlice = createSlice({
  name: 'titleSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [setTitleAsync.pending.type]: (state: TTaskFormTitleReducer) => ({
      ...state,
      status: RequestStatuses.LOADING,
    }),
    [setTitleAsync.fulfilled.type]: (state: TTaskFormTitleReducer,
      { payload: task }: PayloadAction<TTask>) => ({
      ...state,
      status: RequestStatuses.SUCCESS,
      title: task.title,
    }),
    [setTitleAsync.rejected.type]: (state: TTaskFormTitleReducer,
      { payload: error }: PayloadAction<Error>) => ({
      title: null,
      status: RequestStatuses.FAILURE,
      error,
    }),
  },
});

export const titleReducer = titleSlice.reducer;
