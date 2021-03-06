import React, { useEffect, useState } from 'react';
import { AutoComplete, Spin } from 'antd';
import { alert, useDebounce } from 'shared';
import { useDispatch, useSelector } from 'react-redux';
import { TagsSlice, TaskFilters } from 'store/slice';
import { Tag } from 'features/Tasks/tasksComponents/index';
import styles from './index.module.scss';
import { TTag } from 'store/slice/task/entities';
import PlusSquaredIcon from '../../../../../shared/ui/icons/PlusSquaredIcon/PlusSquaredIcon';

const TagsFilter = () => {
  const [search, setSearch] = useState('');
  const [tagsSelected, setTagsSelected] = useState<TTag[]>([]);
  const [open, setOpen] = useState(false);
  const isLoading = useSelector(TagsSlice.isLoadingTags);
  const tags = useSelector(TagsSlice.getTagsSelector);
  const tagsFilterSelected = useSelector(TaskFilters.getTags);
  const debouncedSearch: string = useDebounce<string>(search, 500);
  const dispatch = useDispatch();
  const handleSearch = (e: string) => {
    setSearch(e);
  };
  const handleSelect = (value: string) => {
    setSearch('');
    const tag = tags.find((el) => el.task_tag_id === value);
    if (tag && tagsSelected.length < 10) {
      setTagsSelected((prev) => [...prev, tag]);
    } else if (tagsSelected.length === 10) {
      alert('Нельзя добавить больше 10 меток', 'warning');
    }
    setOpen(true);
  };
  const filtersTags = tags.filter(
    (tag) =>
      tagsSelected.findIndex((tagSelected) => tag.task_tag_id === tagSelected.task_tag_id) === -1,
  );
  const removeTag = (tagId: string) => {
    setTagsSelected((prev) => prev.filter((el) => el.task_tag_id !== tagId));
  };
  const focusHandle = () => {
    dispatch(
      TagsSlice.getTagsAsync({
        search: debouncedSearch,
        page: 1,
        perPage: 500,
      }),
    );
    setOpen(true);
  };
  const closeHandle = () => {
    setOpen(false);
    setSearch('');
  };
  useEffect(() => {
    if (open) {
      dispatch(
        TagsSlice.getTagsAsync({
          search: debouncedSearch,
          page: 1,
          perPage: 500,
        }),
      );
    }
  }, [debouncedSearch, open]);

  useEffect(() => {
    dispatch(TaskFilters.setTags(tagsSelected));
  }, [tagsSelected]);

  useEffect(() => {
    if (tagsFilterSelected.length === 0 && tagsSelected.length !== 0) {
      setTagsSelected([]);
    }
  }, [tagsFilterSelected]);

  return (
    <>
      <div className={styles.autoCompleteWrap}>
        <AutoComplete
          value={search}
          onSelect={handleSelect}
          open={open}
          onBlur={closeHandle}
          onFocus={focusHandle}
          onSearch={handleSearch}
          suffixIcon={<PlusSquaredIcon />}
          placeholder="Поиск ..."
          getPopupContainer={() => document.querySelector('.ant-layout') as HTMLElement}
        >
          {isLoading ? (
            <AutoComplete.Option key="unique_key" value={null}>
              <Spin />
            </AutoComplete.Option>
          ) : (
            filtersTags
            && filtersTags.map((tag) => (
              <AutoComplete.Option key={tag.task_tag_id} value={tag.task_tag_id}>
                <Tag tag={tag} key={tag.task_tag_id} />
              </AutoComplete.Option>
            ))
          )}
          {filtersTags.length === 0 && <AutoComplete.Option>Нет меток</AutoComplete.Option>}
        </AutoComplete>
      </div>
      <div className={styles.selectedTags}>
        {tagsSelected.map((tag) => (
          <Tag
            tag={tag}
            key={tag.task_tag_id}
            deleteHandle={() => {
              removeTag(tag.task_tag_id);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default TagsFilter;
