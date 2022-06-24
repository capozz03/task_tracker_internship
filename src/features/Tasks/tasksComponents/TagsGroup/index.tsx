import React, { useState } from 'react';
import Tag from 'features/Tasks/tasksComponents/Tag';
import { TRoles, TTagsTask } from 'store/slice/task/entities';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import TagsChanger from '../TagsChanger';
import { usePermissions } from 'shared/helpers';
import Tooltip from 'features/Tasks/tasksComponents/Tooltip';
import TagsEditor from 'features/Tasks/tasksComponents/TagsEditor';

type TagsGroupProps = {
  tags: TTagsTask[],
  taskId: string,
  roles: TRoles[],
}

const TagsGroup = ({ tags, taskId, roles }: TagsGroupProps) => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const can = usePermissions(
    ['change.tag'],
    roles,
  );

  const removeTag = (tagId: string) => () => {
    dispatch(TaskFormSlice.removeTagToTask({ taskId, tagId }));
  };

  const onClickShowAll = (e: React.MouseEvent<HTMLElement>) => {
    setShowAll(true);
    e.stopPropagation();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.markGroup}>
        {
          tags.slice(0, 2).map((tag) => (
            <Tag
              tag={tag.task_tag}
              key={tag.task_tag.task_tag_id}
              deleteHandle={
                can['change.tag']
                  ? removeTag(tag.task_tag.task_tag_id)
                  : undefined
              }
            />
          ))
        }
        {
          !showAll
            ? (
              <div className={styles.lastTag}>
                { tags.length > 2
                && (<Tag
                  tag={tags[2].task_tag}
                  deleteHandle={
                    can['change.tag']
                      ? removeTag(tags[2].task_tag.task_tag_id)
                      : undefined
                  }
                />)}
                {
                tags.length > 3
                && (
                <Tooltip title="Показать все">
                  <button type="button" className={styles.othersButton} onClick={onClickShowAll}>
                    {`+${tags.length - 3}`}
                  </button>
                </Tooltip>)
              }
                {
                  can['change.tag']
                  && (
                    <span className={styles.addButtonWrapper}>
                      <TagsChanger taskTags={tags} currentTaskId={taskId} />
                      <TagsEditor />
                    </span>
                  )
                }
              </div>
            )
            : (
              <>
                {
                  tags.slice(2).map((tag) => (
                    <Tag
                      tag={tag.task_tag}
                      key={tag.task_tag.task_tag_id}
                      deleteHandle={
                        can['change.tag']
                          ? removeTag(tag.task_tag.task_tag_id)
                          : undefined
                      }
                    />
                  ))
                }
                {
                  can['change.tag']
                  && (
                    <span className={styles.addButtonWrapper}>
                      <TagsChanger taskTags={tags} currentTaskId={taskId} />
                      <TagsEditor />
                    </span>
                  )
                }
              </>
            )
        }
      </div>
    </div>
  );
};

export default TagsGroup;
