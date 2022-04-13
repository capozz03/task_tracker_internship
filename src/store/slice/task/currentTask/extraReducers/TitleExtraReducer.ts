import { setTitleAsync } from '../asyncAction';
import { RequestStatuses } from 'shared';
import { PayloadAction } from '@reduxjs/toolkit';
import { TTask } from '../../entities';
import { TCurrentTaskReducer } from '../slice';

export const setTitleAsyncExtraReducer = {
  [setTitleAsync.pending.type]:
    (state: TCurrentTaskReducer) => ({
      ...state,
      status: RequestStatuses.LOADING,
    }),
  [setTitleAsync.fulfilled.type]:
    (state : TCurrentTaskReducer, { payload: task }: PayloadAction<TTask>) => ({
      ...state,
      status: RequestStatuses.SUCCESS,
      task,
    }),
  [setTitleAsync.rejected.type]:
    (state : TCurrentTaskReducer, { payload: error }: PayloadAction<Error>) => ({
      ...state,
      status: RequestStatuses.FAILURE,
      error,
    }),
};
