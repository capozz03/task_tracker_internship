import React, { useCallback, useEffect, useState } from 'react';
import { TTag, TTagsTask } from 'store/slice/task/entities';
import DetailCategory from 'features/Task/taskModalComponents/Details/DetailCategory';
import { Tag } from 'features/Tasks/tasksComponents';
import { useDispatch, useSelector } from 'react-redux';
import { TagsSlice, TaskFormSlice } from 'store/slice';
import styles from './index.module.scss';
import { Dropdown, Menu } from 'antd';

type TProps = {
  currentTaskId: string | undefined;
  taskTags: TTagsTask[] | null;
  hiddenCategory: ()=>void;
};

const TagsCategory = ({ currentTaskId, taskTags, hiddenCategory }: TProps) => {
  const dispatch = useDispatch();
  const allTags = useSelector(TagsSlice.getTagsSelector);
  const [visible, setVisible] = useState<boolean>(false);
  const [tags, setTags] = useState<TTag[]>([]);

  useEffect(() => {
    if (taskTags) {
      setTags(allTags.filter(((tag) => taskTags.filter(
        (taskTag) => taskTag.task_tag.task_tag_id === tag.task_tag_id).length === 0)));
    } else {
      setTags(allTags);
    }
  }, [allTags, taskTags]);

  const onTagAdd = (tagId: string, currentTaskId: string | undefined) => {
    if (currentTaskId) dispatch(TaskFormSlice.addTagToTask({ taskId: currentTaskId, tagId }));
  };

  const onTagRemove = (tagId: string, currentTaskId: string | undefined) => {
    if (currentTaskId) dispatch(TaskFormSlice.removeTagToTask({ taskId: currentTaskId, tagId }));
  };

  const onTagAddHandler = useCallback((tagId: string) => (
    onTagAdd(tagId, currentTaskId)
  ), [currentTaskId, taskTags]);

  const onTagRemoveHandler = useCallback((tagId: string) => (
    onTagRemove(tagId, currentTaskId)
  ), [currentTaskId, taskTags]);

  const removeCategory = useCallback(() => {
    if (taskTags && currentTaskId) {
      taskTags.forEach((tag) => {
        dispatch(TaskFormSlice.removeTagToTask({
          taskId: currentTaskId,
          tagId: tag.task_tag.task_tag_id,
        }));
      });

      hiddenCategory();
    }
  }, [currentTaskId, taskTags, hiddenCategory]);

  const menu = (
    <Menu onClick={() => setVisible(true)} className={styles.menu}>
      {
        tags.map((tag) => (
          <Menu.Item key={tag.task_tag_id} onClick={() => onTagAddHandler(tag.task_tag_id)}>
            <Tag tag={tag} />
          </Menu.Item>
        ))
      }
    </Menu>
  );

  return (
    <DetailCategory name="Метки" type="details" removeHandler={removeCategory} tooltip="Убрать все метки">
      <div className={styles.wrapper}>
        <div className={styles.tags}>
          {
            taskTags && taskTags.map((tag) => (
              <Tag
                tag={tag.task_tag}
                key={tag.task_to_tag_id}
                deleteHandle={() => onTagRemoveHandler(tag.task_tag.task_tag_id)}
              />
            ))
          }
        </div>
        <Dropdown
          overlay={menu}
          trigger={['click']}
          visible={visible}
          onVisibleChange={setVisible}
        >
          <button type="button" className={styles.addButton}>
            + Добавить метку
          </button>
        </Dropdown>
      </div>
    </DetailCategory>
  );
};

export default TagsCategory;
