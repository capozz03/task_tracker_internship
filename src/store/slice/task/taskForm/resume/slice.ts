import { createSlice } from '@reduxjs/toolkit';
import { RequestStatuses } from 'shared';
import { TFormResult } from '../../entities';

type TResumeSlice = {
  form_result: TFormResult[] | null;
  status: RequestStatuses;
  error: null | Error;
};

const initialState = {
  form_result: null,
  status: RequestStatuses.IDLE,
  error: null,
} as TResumeSlice;

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {},
});

export const resumeSliceReducer = resumeSlice.reducer;
