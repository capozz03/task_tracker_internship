import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { checkListService } from './services';
import { alert } from 'shared/ui';
import { TaskFormSlice } from 'store/slice';
import {
  attachCheckListProps,
  changeCheckListTitleProps,
  changeItemForChecklistProps,
  changePositionItemForChecklistProps,
  changeStatusItemForChecklistProps,
  createCheckListProps,
  deleteItemForChecklistProps,
} from './entities';

// Создаём чеклист
export const createCheckList = createAsyncThunk(
  'checkList/createCheckList',
  async (props: createCheckListProps, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await checkListService.createChecklist(props);
      const { taskForm } = await getState() as any;
      alert(`Чек-лист "${data.data.title.slice(0, 25)}${data.data.title.length > 25 ? '...' : ''}" успешно создан`, 'success');
      const { data: task } = await checkListService.attachCheckList({
        checkListId: data.data.check_list_id,
        taskId: taskForm.task.task.task_id,
      });
      dispatch(TaskFormSlice.updateTask(task.data));
      dispatch(TaskFormSlice.hiddenFormCreateChecklist());
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось создать чек-лист. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

// Изменить название чеклиста
type changeCheckListTitleAsyncProps = {
  data: {
    title: string,
    checkListId: string,
  },
  successHandle: ()=>void,
  errorHandle: ()=>void,
}

export const changeCheckListTitle = createAsyncThunk(
  'checkList/changeCheckListTitle',
  async ({ data, successHandle, errorHandle }: changeCheckListTitleAsyncProps,
    { rejectWithValue }) => {
    try {
      const { data: task } = await checkListService.changeChecklistTitle(data);
      alert('Название чеклиста успешно изменено', 'success');
      successHandle();
      return task;
    } catch (rejectedValueOrSerializedError) {
      errorHandle();
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось изменить название чек-листа. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

// Создание элемента для чеклиста
export const createItemForChecklist = createAsyncThunk(
  'checkList/createItemForChecklist',
  async (props: changeCheckListTitleProps, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await checkListService.createItemForChecklist(props);
      dispatch(TaskFormSlice.pushItemForCheckList({
        checkListId: props.checkListId,
        checklistItem: data.data,
      }));
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось создать элемент для чек-листа. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

// Изменить название элемент чеклиска
type changeItemForChecklistAsyncProps = {
  data: changeItemForChecklistProps,
  successHandle: ()=>void,
  errorHandle: ()=>void,
}

export const changeItemForChecklist = createAsyncThunk(
  'checkList/changeItemForChecklist',
  async (
    { data, successHandle, errorHandle }: changeItemForChecklistAsyncProps,
    { rejectWithValue }) => {
    try {
      const { data: item } = await checkListService.changeItemForChecklist(data);
      successHandle();
      return item;
    } catch (rejectedValueOrSerializedError) {
      errorHandle();
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось обновить элемент для чек-листа. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

// Изменить статус элемент чеклиска
export const changeStatusItemForChecklist = createAsyncThunk(
  'checkList/changeStatusItemForChecklist',
  async (props: changeStatusItemForChecklistProps, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await checkListService.changeStatusItemForChecklist(props);
      dispatch(TaskFormSlice.changeStatusItemForChecklistTaskForm(props));
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось создать элемент для чек-листа. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
// Удаление элемента чеклиста
export const deleteItemForChecklist = createAsyncThunk(
  'checkList/changeStatusItemForChecklist',
  async (props: deleteItemForChecklistProps, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await checkListService.deleteItemForChecklist(props);
      alert(`Пункт ${data.data.message} удален`, 'remove', [{
        text: 'отменить',
        action: () => {
          dispatch(createItemForChecklist({
            checkListId: props.checkListId,
            checkListItemId: props.checkListItemId,
            title: data.data.message,
            complete: data.data.complete,
          }));
        },
      }]);
      dispatch(TaskFormSlice.removeItemFromCheckList({
        checkListId: props.checkListId,
        checklistItem: data.data,
      }));
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось удалить элемент чек-листа. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

// Изменить положение элемента чеклиста
export const changePositionItemForChecklist = createAsyncThunk(
  'checkList/changeStatusItemForChecklist',
  async (props: changePositionItemForChecklistProps, { rejectWithValue }) => {
    try {
      const { data } = await checkListService.changePositionItemForChecklist(props);
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось удалить элемент чек-листа. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

export const detachChecklist = createAsyncThunk(
  'checkList/detachChecklist',
  async ({ checkListId, taskId, message }: attachCheckListProps,
    { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await checkListService.detachChecklist({
        taskId,
        checkListId,
      });
      dispatch(TaskFormSlice.updateTask(data.data));
      const { taskForm } = await getState() as any;
      alert(`Чек-лист "${message?.slice(0, 25)}${message!.length > 25 ? '...' : ''}" успешно удален`, 'remove', [{
        text: 'отменить',
        action: async () => {
          const { data } = await checkListService.attachCheckList({
            checkListId,
            taskId: taskForm.task.task.task_id,
          });
          dispatch(TaskFormSlice.updateTask(data.data));
        },
      }]);
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось удалить элемент чек-листа. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
