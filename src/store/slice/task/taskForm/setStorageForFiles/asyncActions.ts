import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { storageFilesSlice } from './services';
import { alert } from 'shared/ui';
import {
  createStorageFileProps,
  getStorageFileDetailsProps,
} from './entities';

// Создаём место под файл
export const createStorageFile = createAsyncThunk(
  'storageFile/createStorageFile',
  async (props: createStorageFileProps, { rejectWithValue }) => {
    try {
      const { data } = await storageFilesSlice.createStorageFile(props);
      alert(`Место под файл "${data.data.name_original.slice(0, 25)}${data.data.name_original.length > 25 ? '...' : ''}" успешно создан`, 'success');
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось создать Место под файл. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

// Получить детали о файле
export const getStorageFileDetails = createAsyncThunk(
  'storageFile/getStorageFileDetails',
  async (props: getStorageFileDetailsProps, { rejectWithValue }) => {
    try {
      const { data } = await storageFilesSlice.getStorageFileDetails(props);
      alert('Название чеклиста успешно изменено', 'success');
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось изменить название чек-листа. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

// Загрузить файл
export const uploadStorageFile = createAsyncThunk(
  'storageFile/uploadStorageFile',
  async (props: createStorageFileProps, { rejectWithValue }) => {
    try {
      const { data } = await storageFilesSlice.uploadStorageFile(props);
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось создать элемент для чек-листа. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

// Скачать файл
export const downloadStorageFile = createAsyncThunk(
  'storageFile/downloadStorageFile',
  async (props: getStorageFileDetailsProps, { rejectWithValue }) => {
    try {
      const { data } = await storageFilesSlice.downloadStorageFile(props);
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось создать элемент для чек-листа. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
