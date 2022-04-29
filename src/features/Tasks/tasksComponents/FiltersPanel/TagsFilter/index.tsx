import React, { useEffect, useState } from 'react';
import { AutoComplete, Spin } from 'antd';
import { useDebounce } from 'shared';
import { useDispatch, useSelector } from 'react-redux';
import { TagsSlice } from 'store/slice';
import { Tag } from 'features/Tasks/tasksComponents/index';
import './index.module.scss';
import { TTag } from 'store/slice/task/entities';

const TagsFilter = () => {
  const [search, setSearch] = useState('');
  const t: TTag[] = [];
  const [tagsSelected, setTagsSelected] = useState(t);
  const isLoading = useSelector(TagsSlice.isLoadingTags);
  const tags = useSelector(TagsSlice.getTagsSelector);
  const debouncedSearch = useDebounce(search, 500);
  const dispatch = useDispatch();
  const handleSearch = (e: string) => {
    setSearch(e);
  };
  // eslint-disable-next-line no-undef
  const handleSelect = (value: string) => {
    setSearch('');
    const tag = tags.find((el) => el.task_tag_id === value);
    if (tag) {
      setTagsSelected((prev) => ([...prev, tag]));
    }
  };

  const filtersTags = tags.filter((tag) => tagsSelected.findIndex((tagSelected) =>
    tag.task_tag_id === tagSelected.task_tag_id) === -1);

  useEffect(() => {
    dispatch(TagsSlice.getTagsAsync({
      search: debouncedSearch,
      page: 1,
      perPage: 50,
    }));
  },
  [debouncedSearch]);

  return (
    <>
      <AutoComplete
        style={{ width: 200 }}
        value={search}
        onSelect={handleSelect}
        onSearch={handleSearch}
        placeholder="input here"
      >
        { isLoading
          ? <Spin />
          : (
            filtersTags && filtersTags.map((tag) => (
              <AutoComplete.Option key={tag.task_tag_id} value={tag.task_tag_id}>
                <Tag tag={tag} />
              </AutoComplete.Option>
            ))) }
      </AutoComplete>
      <div>
        {
          tagsSelected.map((tag) => (
            <Tag tag={tag} />
          ))
        }
      </div>
    </>
  );
};

export default TagsFilter;
