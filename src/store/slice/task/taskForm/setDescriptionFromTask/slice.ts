import { setDescriptionAsync } from './asyncAction';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { TTask } from '../../entities';

type TTaskFormDescriptionReducer = {
  description: string | null;
  status: RequestStatuses;
  error: Error | null;
};

const initialState = {
  description: '',
  status: RequestStatuses.IDLE,
  error: null,
} as TTaskFormDescriptionReducer;

const descriptionSlice = createSlice({
  name: 'descriptionSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [setDescriptionAsync.pending.type]: (state: TTaskFormDescriptionReducer) => ({
      ...state,
      status: RequestStatuses.LOADING,
    }),
    [setDescriptionAsync.fulfilled.type]: (
      state: TTaskFormDescriptionReducer,
      { payload: task }: PayloadAction<TTask>,
    ) => ({
      ...state,
      status: RequestStatuses.SUCCESS,
      description: task.description,
    }),
    [setDescriptionAsync.rejected.type]: (
      state: TTaskFormDescriptionReducer,
      { payload: error }: PayloadAction<Error>,
    ) => ({
      description: null,
      status: RequestStatuses.FAILURE,
      error,
    }),
  },
});

export const descriptionReducer = descriptionSlice.reducer;
