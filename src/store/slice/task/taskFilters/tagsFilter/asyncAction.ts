import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';
import { TTagsFilterSearchProps } from './entities';
import { tagsFilterService } from './service';

export const getTagsForFilters = createAsyncThunk(
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
