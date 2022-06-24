import React, { useState } from 'react';
import { Popover } from 'antd';
import TagsEditorBody from 'features/Tasks/tasksComponents/TagsEditor/TagsEditorBody';

const TagsEditor = () => {
  const [visible, setVisible] = useState(false);
  const popoverHandle = () => {
    setVisible(true);
  };
  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };
  return (
    <div>
      <Popover
        content={<TagsEditorBody />}
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <button type="button" onClick={popoverHandle}>Редактировать теги</button>
      </Popover>
    </div>
  );
};

export default TagsEditor;
