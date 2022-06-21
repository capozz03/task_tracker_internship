import React, { ChangeEvent, useEffect, useState } from 'react';
import { TTag, TTagsTask } from 'store/slice/task/entities';
import DetailCategory from 'features/Task/taskModalComponents/Details/DetailCategory';
import { Checkbox, Tag } from 'features/Tasks/tasksComponents';
import { useDispatch, useSelector } from 'react-redux';
import { TagsSlice, TaskFormSlice } from 'store/slice';
import styles from './index.module.scss';
import { Dropdown, Input, Menu, Spin } from 'antd';
import { alert, useDebounce } from 'shared';
import { searchIcons } from 'shared/ui/icons';

type TProps = {
  currentTaskId: string | undefined;
  taskTags: TTagsTask[] | null;
  hiddenCategory: ()=>void;
  isDisabled?: boolean;
};

type TTagUnit = TTag & {
  checked: boolean,
}

const { SearchInputIcon } = searchIcons;

const TagsCategory = ({ currentTaskId, taskTags, hiddenCategory, isDisabled = false }: TProps) => {
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
    }
  };

  const removeCategory = () => {
    if (taskTags && currentTaskId) {
      taskTags.forEach((tag) => onTagRemove(tag.task_tag.task_tag_id, currentTaskId));
      hiddenCategory();
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
    if (visible) {
      dispatch(TagsSlice.getTagsAsync({
        search: debouncedValue,
        page: 1,
        perPage: 50,
      }));
    }
  }, [debouncedValue, visible]);

  const menu = (
    <div
      className={styles.menu}
    >
      <div className={styles.inputWrapper}>
        <SearchInputIcon />
        <Input value={searchValue} onChange={searchHandler} placeholder="Найти метку..." onClick={stopPropagation} />
      </div>
      <Menu className={styles.itemsWrapper}>
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
    <DetailCategory
      name="Метки"
      type="details"
      removeHandler={isDisabled ? undefined : removeCategory}
      tooltip="Убрать все метки"
    >
      <div className={styles.wrapper}>
        <div className={styles.tags}>
          {
            taskTags && taskTags.map((tag) => (
              <Tag
                tag={tag.task_tag}
                key={tag.task_to_tag_id}
                deleteHandle={
                  isDisabled
                    ? undefined
                    : onTagChangeStateHandler(tag.task_tag.task_tag_id)
                }
              />
            ))
          }
        </div>
        {
          !isDisabled
          && (
            <Dropdown
              getPopupContainer={() => document.querySelector('.ant-modal-wrap') as HTMLElement}
              overlay={menu}
              trigger={['click']}
              visible={visible}
              onVisibleChange={setDropdownVisible}
            >
              <button type="button" className={styles.addButton}>
                + Добавить метку
              </button>
            </Dropdown>
          )
        }
      </div>
    </DetailCategory>
  );
};

export default TagsCategory;
