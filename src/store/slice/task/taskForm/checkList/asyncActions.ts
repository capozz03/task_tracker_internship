import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { checkListService } from './services';
import { alert } from 'shared/ui';
import {
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
  async (props: createCheckListProps, { rejectWithValue }) => {
    try {
      const { data } = await checkListService.createChecklist(props);
      alert(`Чек-лист "${data.data.title.slice(0, 25)}${data.data.title.length > 25 ? '...' : ''}" успешно создан`, 'success');
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось создать чек-лист. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

// Изменить название чеклиста
export const changeCheckListTitle = createAsyncThunk(
  'checkList/changeCheckListTitle',
  async (props: changeCheckListTitleProps, { rejectWithValue }) => {
    try {
      const { data } = await checkListService.changeChecklistTitle(props);
      alert('Название чеклиста успешно изменено', 'success');
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось изменить название чек-листа. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

// Создание элемента для чеклиста
export const createItemForChecklist = createAsyncThunk(
  'checkList/createItemForChecklist',
  async (props: changeCheckListTitleProps, { rejectWithValue }) => {
    try {
      const { data } = await checkListService.createItemForChecklist(props);
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось создать элемент для чек-листа. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

// Изменить название элемент чеклиска
export const changeItemForChecklist = createAsyncThunk(
  'checkList/changeItemForChecklist',
  async (props: changeItemForChecklistProps, { rejectWithValue }) => {
    try {
      const { data } = await checkListService.changeItemForChecklist(props);
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось создать элемент для чек-листа. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

// Изменить статус элемент чеклиска
export const changeStatusItemForChecklist = createAsyncThunk(
  'checkList/changeStatusItemForChecklist',
  async (props: changeStatusItemForChecklistProps, { rejectWithValue }) => {
    try {
      const { data } = await checkListService.changeStatusItemForChecklist(props);
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
          }));
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
