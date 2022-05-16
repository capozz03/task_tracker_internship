import { TState } from './entities';
import { PayloadAction } from '@reduxjs/toolkit';
import { TRoles } from 'store/slice/task/entities';
import { convertRolesToObject } from 'shared';

export const rolesActions = {
  setRoles: (
    state: TState,
    { payload: roles }: PayloadAction<TRoles[]>,
  ) => {
    state.data = convertRolesToObject(roles);
    return state;
  },
};
