import { getFullInformationTaskAsync } from '../asyncAction';
import { RequestStatuses } from 'shared';
import { PayloadAction } from '@reduxjs/toolkit';
import { TTask } from '../../entities';
import { TCurrentTaskReducer } from '../slice';

export const fullInfoExtraReducers = {
  [getFullInformationTaskAsync.pending.type]:
    (state: TCurrentTaskReducer) => ({
      ...state,
      status: RequestStatuses.LOADING,
    }),
  [getFullInformationTaskAsync.fulfilled.type]:
    (state : TCurrentTaskReducer, { payload: task }: PayloadAction<TTask>) => ({
      ...state,
      status: RequestStatuses.SUCCESS,
      task,
    }),
  [getFullInformationTaskAsync.rejected.type]:
    (state : TCurrentTaskReducer, { payload: error }: PayloadAction<Error>) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      task: null,
      error,
    }),
};
