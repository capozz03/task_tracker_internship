import React, {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
} from 'react';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'antd';
import { icons, alert } from 'shared';
import { TaskFormSlice } from 'store/slice';

type CheckItemMessageProps = {
  title: string;
  checkListId: string;
  isEditing: boolean;
  closeEditMessage: () => void;
};

const ChecklistTitleEditor = (
  {
    title,
    checkListId,
    isEditing,
    closeEditMessage,
  }: CheckItemMessageProps) => {
  const dispatch = useDispatch();
  const [titleText, setTitleText] = useState(title);
  const [oldMessage, setOldMessage] = useState(title);
  const [isVisibleTooltip, setIsVisibleTooltip] = useState(false);
  const textArea = useRef<HTMLInputElement>(null);
  const titleTaskRef = useRef<HTMLDivElement>(null);

  const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitleText(e.target.value);
    if (e.target.value.length === 0 || e.target.value === '0') {
      setIsVisibleTooltip(true);
    } else {
      setIsVisibleTooltip(false);
    }
  };

  const saveSuccess = () => {
    setOldMessage(titleText);
    closeEditMessage();
  };

  const saveError = () => {
    alert('Не удалось изменить название чек-листа', 'error');
  };

  const saveTask = () => {
    setIsVisibleTooltip(false);
    const title = titleText.replaceAll(' ', '');
    if (title.length > 0) {
      dispatch(TaskFormSlice.changeCheckListTitle({
        data: {
          checkListId,
          title: titleText,
        },
        successHandle: saveSuccess,
        errorHandle: saveError,
      }));
    } else {
      setIsVisibleTooltip(true);
    }
  };
  const handleSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    saveTask();
  };

  const handleCancelClick = () => {
    setTitleText(oldMessage);
    closeEditMessage();
    setIsVisibleTooltip(false);
  };

  const handleKeyDownEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTask();
    }
  };

  return (
    <>
      <div className={isEditing ? styles.hidden : styles.visible}>
        <div className={styles.title} ref={titleTaskRef}>
          {titleText}
        </div>
      </div>
      <div className={isEditing ? styles.visible : styles.hidden}>
        <form onSubmit={handleSubmitForm} className={styles.formEdit}>
          <Tooltip title="Название обязательно" visible={isVisibleTooltip} placement="bottom">
            <input
              placeholder="Название задачи"
              autoComplete="off"
              maxLength={150}
              className={styles.textarea}
              ref={textArea}
              onChange={handleChangeTitle}
              value={titleText}
              onKeyDown={handleKeyDownEnter}
            />
          </Tooltip>
          <div className={styles.btnGroup}>
            <button type="submit">
              <icons.PlusIcons />
            </button>
            <button type="button" onClick={handleCancelClick}>
              <icons.CancelIcons />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChecklistTitleEditor;
