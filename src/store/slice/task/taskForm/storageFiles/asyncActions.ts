// import { downloadStorageFile } from './asyncActions';
import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { storageFilesSlice } from './services';
import { alert } from 'shared/ui';
import {
  attachFileDetailsProps,
  createStorageFileProps,
  getStorageFileDetailsProps,
  uploadStorageFileProps,
} from './entities';
import { TaskFormSlice } from 'store/slice';

// Загрузить файл
export const uploadStorageFile = createAsyncThunk(
  'storageFile/uploadStorageFile',
  async (props: uploadStorageFileProps, { rejectWithValue }) => {
    try {
      const { data } = await storageFilesSlice.uploadStorageFile(props);
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось загрузить файл. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

// Создаём место под файл
export const createStorageFile = createAsyncThunk(
  'storageFile/createStorageFile',
  async (props: createStorageFileProps, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await storageFilesSlice.createStorageFile(props);
      const { taskForm } = (await getState()) as any;
      dispatch(
        uploadStorageFile({
          storageFileId: data.data.storage_file_id,
          file: props.file,
        }),
      );
      alert(
        `Файл "${data.data.name_original.slice(0, 25)}${
          data.data.name_original.length > 25 ? '...' : ''
        }" успешно загружен`,
        'success',
      );
      const { data: task } = await storageFilesSlice.attachStorageFileToTask({
        taskId: taskForm.task.task.task_id,
        storageFileId: data.data.storage_file_id,
      });
      dispatch(TaskFormSlice.updateTask(task.data));
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось загрузить файл. Ошибка: "${error.message}"`, 'error');
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
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось получить детали о файле. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

// Скачать файл
export const downloadStorageFile = createAsyncThunk(
  'storageFile/downloadStorageFile',
  async (props: getStorageFileDetailsProps, { rejectWithValue }) => {
    try {
      const { data } = await storageFilesSlice.getStorageFileDetails(props);
      const url = window.URL.createObjectURL(new Blob([data as Blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', data.data.name_original);
      document.body.appendChild(link);
      link.click();
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось скачать файл. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);

// Удалить файл
export const deleteStorageFile = createAsyncThunk(
  'storageFile/deleteStorageFile',
  async (props: attachFileDetailsProps, { rejectWithValue, dispatch }) => {
    try {
      const { data: task } = await storageFilesSlice.detachStorageFileToTask(props);
      alert('Вложение удалено', 'remove');
      dispatch(TaskFormSlice.updateTask(task.data));
      dispatch(TaskFormSlice.hiddenFormStorageFiles());
      return task;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert(`Не удалось удалить вложение. Ошибка: "${error.message}"`, 'error');
      return rejectWithValue(error);
    }
  },
);
