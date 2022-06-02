import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { TFormResultChangeProps } from './entities';
import { formResultChangeService } from './services';
import { alert } from 'shared/ui';
import { TaskFormSlice, TaskCompletedSlice } from 'store/slice';
import { TFiltersSlice } from '../../taskFilters/slice';
import { TTasksReducer } from '../../entities';
import { taskService } from '../../taskFailed/taskFailedService';

export const setFormResult = createAsyncThunk(
  'formResultChangeService/setFormResult',
  async (
    { form_result: { taskId, formResult } }: TFormResultChangeProps,
    { rejectWithValue, dispatch, getState },
  ) => {
    try {
      const { taskCompleted, taskFilters } = getState() as {
        taskCompleted: TTasksReducer;
        taskFilters: TFiltersSlice;
      };
      const { data } = await formResultChangeService(taskId, formResult);
      const formResultResume = formResult && formResult.length && formResult[0].value;
      console.log(formResultResume);
      if (formResultResume === 'Переделать срочно' || formResultResume === 'Задача отклонена') {
        console.log('выполнилась смена статуса');
        const { data: task } = await taskService.changeStatusTask({
          task_id: taskId,
          task_status_id: '599f5d03-1ef0-4a5b-a18c-33a4f44c4610',
        });
        dispatch(
          TaskCompletedSlice.getTasksAsync({
            per_page: taskCompleted.pagination?.per_page,
            page: taskCompleted.pagination?.page_current,
            ...taskFilters.filters,
          }),
        );
        dispatch(TaskFormSlice.updateTask(task.data));
      }
      // dispatch(TaskFormSlice.updateTask(data.data));
      // dispatch(TaskFormSlice.updateTask(task.data));
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось оставить резюме. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
