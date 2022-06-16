import React, { useEffect, useState } from 'react';
import Tag from 'features/Tasks/tasksComponents/Tag';
import { TRoles, TTagsTask } from 'store/slice/task/entities';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import TagsChanger from '../TagsChanger';
import { Tooltip } from 'antd';
import { checkPermission } from 'shared/helpers';

type TagsGroupProps = {
  tags: TTagsTask[],
  taskId: string,
  roles: TRoles[],
}

const TagsGroup = ({ tags, taskId, roles }: TagsGroupProps) => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [can, setCan] = useState({
    change: checkPermission('change.tag', roles),
  });

  useEffect(() => {
    setCan({
      change: checkPermission('change.tag', roles),
    });
  }, [roles]);

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
                can.change
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
                    can.change
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
                  can.change
                  && (
                    <span className={styles.addButtonWrapper}>
                      <TagsChanger taskTags={tags} currentTaskId={taskId} />
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
                        can.change
                          ? removeTag(tag.task_tag.task_tag_id)
                          : undefined
                      }
                    />
                  ))
                }
                {
                  can.change
                  && (
                    <span className={styles.addButtonWrapper}>
                      <TagsChanger taskTags={tags} currentTaskId={taskId} />
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
