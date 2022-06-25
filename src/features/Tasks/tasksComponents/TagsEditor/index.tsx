import React, { MouseEventHandler, useState } from 'react';
import { Popover } from 'antd';
import TagsEditorBody from './TagsEditorBody';
import { TagsSlice } from 'store/slice';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import SettingIcon from 'shared/ui/icons/SettingIcon/SettingIcon';

type TagsEditorProps = {
  isVisibleText?: boolean;
  container: string; // Селектор
}

const TagsEditor = ({ isVisibleText = false, container }: TagsEditorProps) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const popoverHandle: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    setVisible(true);
  };
  const handleVisibleChange = (newVisible: boolean) => {
    dispatch(TagsSlice.getTagsAsync({
      search: '',
      perPage: 500,
      page: 1,
    }));
    setVisible(newVisible);
  };
  return (
    <Popover
      content={<TagsEditorBody />}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      zIndex={1000}
      getPopupContainer={() => document.querySelector(container) as HTMLElement}
    >
      <button type="button" className={styles.btn} onClick={popoverHandle}>
        <SettingIcon />
        {isVisibleText && 'Настроить метки'}
      </button>
    </Popover>
  );
};

export default TagsEditor;
