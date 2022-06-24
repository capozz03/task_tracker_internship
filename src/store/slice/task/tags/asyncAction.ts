import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { TTagsCreateRequest, TTagsDeleteRequest, TTagsFilterSearchProps, TTagsUpdateRequest } from './entities';
import { tagsFilterService } from './service';
import { alert } from 'shared';
import { TagsSlice } from 'store/slice';

export const getTagsAsync = createAsyncThunk(
  'tagsFilterSlice/getTagsForFilters',
  async (props: TTagsFilterSearchProps, { rejectWithValue }) => {
    try {
      const { data } = await tagsFilterService.getTags(props);
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      return rejectWithValue(error);
    }
  },
);

export const createTagAsync = createAsyncThunk(
  'tagsFilterSlice/createTagAsync',
  async (props: TTagsCreateRequest, { rejectWithValue }) => {
    try {
      const { data } = await tagsFilterService.createTag(props);
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      alert('Ошибка при создании тега', 'error');
      return rejectWithValue(error);
    }
  },
);

export const updateTagAsync = createAsyncThunk(
  'tagsFilterSlice/updateTagAsync',
  async (props: TTagsUpdateRequest, { rejectWithValue }) => {
    try {
      const { data } = await tagsFilterService.updateTag(props);
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      return rejectWithValue(error);
    }
  },
);

export const deleteTagAsync = createAsyncThunk(
  'tagsFilterSlice/updateTagAsync',
  async (props: TTagsDeleteRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await tagsFilterService.deleteTag(props);
      dispatch(TagsSlice.getTagsAsync({
        search: '',
        page: 1,
        perPage: 500,
      }));
      return data;
    } catch (rejectedValueOrSerializedError) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      return rejectWithValue(error);
    }
  },
);
