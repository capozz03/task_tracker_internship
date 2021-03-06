import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';
import Button from 'features/Tasks/tasksComponents/Button';
import style from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setDescriptionAsync } from 'store/slice/task/taskForm/setDescriptionFromTask/asyncAction';
import { alert } from 'shared/ui';
import { buttons, buttonsMD, buttonsSM, buttonsXS, removeButtons } from './configConstants';
import { TaskFormSlice } from 'store/slice';

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
  const description = useSelector(TaskFormSlice.getTaskFormDescription);

  const config = {
    readonly: false,
    language: 'ru',
    placeholder: 'Начните писать...',
    tabIndex: 1,
    buttons,
    buttonsMD,
    buttonsSM,
    buttonsXS,
    removeButtons,
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    enableDragAndDropFileToEditor: false,
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
    if (!description) {
      setContent('');
    } else {
      setContent(description);
    }
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
