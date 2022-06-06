import React, { ChangeEvent, useEffect, useState } from 'react';
import { TTag, TTagsTask } from 'store/slice/task/entities';
import { Checkbox, Tag } from 'features/Tasks/tasksComponents';
import { useDispatch, useSelector } from 'react-redux';
import { TagsSlice, TaskFormSlice } from 'store/slice';
import styles from './index.module.scss';
import { Dropdown, Input, Menu, Spin, Tooltip } from 'antd';
import { alert, useDebounce } from 'shared';
import { PencilIcon, searchIcons } from 'shared/ui/icons';

type TProps = {
  currentTaskId: string | undefined;
  taskTags: TTagsTask[];
};

type TTagUnit = TTag & {
  checked: boolean,
}

const { SearchInputIcon } = searchIcons;

const TagsChanger = ({ currentTaskId, taskTags }: TProps) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(TagsSlice.isLoadingTags);
  const allTags = useSelector(TagsSlice.getTagsSelector);
  const [visible, setVisible] = useState<boolean>(false);
  const [tags, setTags] = useState<TTagUnit[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, 500);

  const onTagAdd = (tagId: string, currentTaskId: string | undefined) => {
    if (currentTaskId) dispatch(TaskFormSlice.addTagToTask({ taskId: currentTaskId, tagId }));
  };

  const onTagRemove = (tagId: string, currentTaskId: string | undefined) => {
    if (currentTaskId) dispatch(TaskFormSlice.removeTagToTask({ taskId: currentTaskId, tagId }));
  };

  const onTagChangeStateHandler = (tagId: string) => () => {
    const elem = tags.find((tag) => tag.task_tag_id === tagId);
    if (elem) {
      if (!elem.checked) {
        if (taskTags && taskTags.length >= 7) {
          alert('Нельзя назначить более 7 меток на задачу', 'warning');
        } else {
          onTagAdd(tagId, currentTaskId);
        }
      } else {
        onTagRemove(tagId, currentTaskId);
      }
      setSearchValue('');
    }
  };

  const stopPropagation = (e: any) => e.stopPropagation();
  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const setDropdownVisible = (flag: boolean) => {
    setVisible(flag);
    if (!flag) setSearchValue('');
  };

  useEffect(() => {
    if (taskTags && allTags) {
      setTags(allTags.map((tag) => ({
        ...tag,
        checked: taskTags.findIndex((t) =>
          t.task_tag.task_tag_id === tag.task_tag_id) !== -1,
      })));
    }
  }, [allTags, taskTags]);

  useEffect(() => {
    dispatch(TagsSlice.getTagsAsync({
      search: debouncedValue,
      page: 1,
      perPage: 50,
    }));
  },
  [debouncedValue]);

  const menu = (
    <div
      className={styles.menu}
      onClick={stopPropagation}
      role="button"
      aria-hidden="true"
    >
      <div className={styles.inputWrapper}>
        <SearchInputIcon />
        <Input value={searchValue} onChange={searchHandler} placeholder="Найти метку..." onClick={stopPropagation} />
      </div>
      <Menu className={styles.itemsWrapper} onClick={stopPropagation}>
        {
          isLoading
            ? <Spin />
            : tags.map((tag) => (
              <Menu.Item
                key={tag.task_tag_id}
              >
                <Checkbox
                  checked={tag.checked}
                  onChange={onTagChangeStateHandler(tag.task_tag_id)}
                  onClick={stopPropagation}
                >
                  <Tag tag={tag} />
                </Checkbox>
              </Menu.Item>
            ))
        }
      </Menu>
    </div>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      visible={visible}
      onVisibleChange={setDropdownVisible}
    >
      <Tooltip title="Добавить метку">
        <button type="button" className={styles.addButton} onClick={stopPropagation}>
          <PencilIcon />
          { !taskTags.length && 'Без метки' }
        </button>
      </Tooltip>
    </Dropdown>
  );
};

export default TagsChanger;
