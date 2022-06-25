import React from 'react';
import { List } from 'antd';
import SquareColor from 'shared/ui/icons/SquareColor';
import styles from 'features/Tasks/tasksComponents/TagsEditor/TagsEditorBody/index.module.scss';
import classNames from 'classnames';
import PencilIcon from 'shared/ui/icons/PencilIcon';
import TrashIcon from 'shared/ui/icons/TrashIcon';
import { TTag } from 'store/slice/task/entities';
import { useDispatch } from 'react-redux';
import { TagsSlice } from 'store/slice';

type TagItemProps = {
  tag: TTag;
  showModalForDelete: () => void;
  showModalForEdit: () => void;
}

const TagItem = ({ tag, showModalForDelete, showModalForEdit }: TagItemProps) => {
  const dispatch = useDispatch();
  const deleteHandle = () => {
    dispatch(TagsSlice.setCurrentTag(tag));
    showModalForDelete();
  };
  const editHandle = () => {
    dispatch(TagsSlice.setCurrentTag(tag));
    showModalForEdit();
  };
  return (
    <List.Item key={tag.task_tag_id} className="item">
      <SquareColor color={tag.color} />
      <div className={styles.tagName}>{tag.name}</div>
      <button
        type="button"
        className={classNames([styles.btn, styles.btnEdit])}
        onClick={editHandle}
      >
        <PencilIcon />
      </button>
      <button
        type="button"
        className={classNames([styles.btn, styles.btnDelete])}
        onClick={deleteHandle}
      >
        <TrashIcon />
      </button>
    </List.Item>
  );
};

export default TagItem;
