import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { rolesService } from './services';
import { TaskFormSlice } from 'store/slice';
import { alert } from 'shared/ui';
import { TRolesChangeProps } from './entities';
import { convertRolesToObject } from 'shared';

export const addUserRole = createAsyncThunk(
  'roles/addUserRole',
  async (props: TRolesChangeProps, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await rolesService.addUserRole(props);
      alert(`Пользователь "${props.userName}" назначен на роль "${props.roleName}"`, 'success');
      dispatch(TaskFormSlice.updateTask(data.data));
      dispatch(TaskFormSlice.resetTaskHistory());
      return convertRolesToObject(data.data.roles);
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось назначить роль пользователю. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

export const removeUserRole = createAsyncThunk(
  'roles/removeUserRole',
  async (props: TRolesChangeProps, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await rolesService.removeUserRole(props);
      alert(`Пользователь "${props.userName}" снят с роли "${props.roleName}"`, 'success');
      dispatch(TaskFormSlice.updateTask(data.data));
      dispatch(TaskFormSlice.resetTaskHistory());
      return convertRolesToObject(data.data.roles);
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось назначить роль пользователю. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
