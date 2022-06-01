import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';
import Button from 'features/Tasks/tasksComponents/Button';
import style from './index.module.scss';
import { useDispatch } from 'react-redux';
import { setDescriptionAsync } from 'store/slice/task/taskForm/setDescriptionFromTask/asyncAction';
import { alert } from 'shared/ui';

type DescriptionEditorProps = {
  setIsVisibleEditor: React.Dispatch<React.SetStateAction<boolean>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  taskId: string;
};

const DescriptionEditor = ({
  setIsVisibleEditor,
  setContent,
  content,
  taskId,
}: DescriptionEditorProps) => {
  const editor = useRef(null);
  const dispatch = useDispatch();

  const config = {
    readonly: false,
    placeholder: 'Начните писать...',
    tabIndex: 1,
    buttons: ['bold', 'italic', 'underline', 'fontsize', 'link', 'image', 'brush', 'left', 'center', 'right'],
    removeButtons: [
      'ul',
      'ol',
      'eraser',
      'paragraph',
      'fullsize',
      'copyformat',
      'hr',
      'table',
      'font',
      'video',
      'file',
    ],
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    enableDragAndDropFileToEditor: true,
    uploader: { insertImageAsBase64URI: true },
    toolbarAdaptive: true,
    toolbarSticky: true,
    statusbar: false,
  };

  const configRef = useRef(config);

  const handleSetContext = (value: string) => {
    setContent(value);
  };

  const handleVisibleEditor = (): void => {
    setIsVisibleEditor(false);
    setContent('');
  };

  const saveSuccess = () => {
    alert('Описание успешно изменено', 'success');
    setIsVisibleEditor(false);
  };

  const saveError = () => {
    alert('Описание не изменено :(', 'warning');
  };

  const saveButton = (): void => {
    dispatch(
      setDescriptionAsync({
        data: {
          description: content,
          taskId,
        },
        successHandle: saveSuccess,
        errorHandle: saveError,
      }),
    );
  };

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={configRef.current}
        onBlur={(newContent) => setContent(newContent)}
        onChange={handleSetContext}
      />
      <div className={style.wrapBtn}>
        <Button type="default" className={style.saveButton} onClick={saveButton}>
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
