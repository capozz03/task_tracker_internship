import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { TState } from './entities';
import { datesActions } from './actions';
import { changeTaskDateStart, changeTaskDateStop } from './asyncActions';

const initialState = {
  data: null,
  status: RequestStatuses.IDLE,
  error: null,
} as TState;

const taskFormDatesSlice = createSlice({
  name: 'taskFormDates',
  initialState,
  reducers: datesActions,
  extraReducers: {
    [changeTaskDateStart.pending.type]: (state: TState) => ({
      ...state,
      status: RequestStatuses.LOADING,
      error: null,
    }),
    [changeTaskDateStart.fulfilled.type]: (
      state: TState,
      { payload: startDate }: PayloadAction<string | null>,
    ) => ({
      ...state,
      data: { ...state.data, start: startDate },
      status: RequestStatuses.SUCCESS,
      error: null,
    }),
    [changeTaskDateStart.rejected.type]: (
      state: TState,
      { payload: error }: PayloadAction<Error>,
    ) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      error,
    }),

    [changeTaskDateStop.pending.type]: (state: TState) => ({
      ...state,
      status: RequestStatuses.LOADING,
      error: null,
    }),
    [changeTaskDateStop.fulfilled.type]: (
      state: TState,
      { payload: stopDate }: PayloadAction<string | null>,
    ) => ({
      ...state,
      data: { ...state.data, stop: stopDate },
      status: RequestStatuses.SUCCESS,
      error: null,
    }),
    [changeTaskDateStop.rejected.type]: (
      state: TState,
      { payload: error }: PayloadAction<Error>,
    ) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      error,
    }),
  },
});

export const taskFormDatesReducer = taskFormDatesSlice.reducer;
export const { setDateStart, setDateStop } = taskFormDatesSlice.actions;
const selectSelf = (state: any) => state;
export const taskFormDatesSelector = createSelector(selectSelf, (state: any) => state.data);
