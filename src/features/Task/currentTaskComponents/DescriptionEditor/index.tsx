import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import Button from 'features/Tasks/tasksComponents/Button';
import style from './index.module.scss';

type DescriptionEditorProps = {
  setIsVisibleEditor: React.Dispatch<React.SetStateAction<boolean>>
}

const DescriptionEditor = ({ setIsVisibleEditor }: DescriptionEditorProps) => {
  const editor = useRef(null);
  const [content, setContent] = useState<string>('');

  const config = {
    readonly: false,
  };

  const handleSetContext = (value: string) => {
    setContent(value);
  };

  const handleVisibleEditor = (): void => {
    setIsVisibleEditor(false);
  };

  return (
    <div>
      <JoditEditor ref={editor} value={content} config={config} onBlur={handleSetContext} />
      <div className={style.wrapBtn}>
        <Button type="default" className={style.saveButton}>
          Сохранить
        </Button>
        <Button type="default" className={style.cancelButton} onClick={handleVisibleEditor}>
          Отменить
        </Button>
      </div>
    </div>
  );
};

export default DescriptionEditor;
