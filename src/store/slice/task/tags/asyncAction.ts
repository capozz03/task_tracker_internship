import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import {
  TTagsCreateProps,
  TTagsDeleteRequest,
  TTagsFilterSearchProps, TTagsUpdateProps,
} from './entities';
import { tagsFilterService } from './service';
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
  async ({ tag, resolveHandle, rejectedHandle }: TTagsCreateProps,
    { rejectWithValue, dispatch }) => {
    try {
      const { data } = await tagsFilterService.createTag(tag);
      dispatch(TagsSlice.getTagsAsync({
        search: '',
        page: 1,
        perPage: 500,
      }));
      resolveHandle();
      return data;
    } catch (rejectedValueOrSerializedError: any) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      rejectedHandle(rejectedValueOrSerializedError.response.data.message);
      return rejectWithValue(error);
    }
  },
);

export const updateTagAsync = createAsyncThunk(
  'tagsFilterSlice/updateTagAsync',
  async ({ tag, resolveHandle, rejectedHandle }: TTagsUpdateProps,
    { rejectWithValue, dispatch }) => {
    try {
      const { data } = await tagsFilterService.updateTag(tag);
      dispatch(TagsSlice.getTagsAsync({
        search: '',
        page: 1,
        perPage: 500,
      }));
      resolveHandle();
      return data;
    } catch (rejectedValueOrSerializedError: any) {
      const error = miniSerializeError(rejectedValueOrSerializedError);
      rejectedHandle(rejectedValueOrSerializedError.response.data.message);
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
