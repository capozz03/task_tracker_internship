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
  message: string;
  checkListItemId: string;
  checkListId: string;
  isEditing: boolean;
  closeEditMessage: () => void;
  checked: boolean;
};

const CheckItemMessage = (
  {
    message,
    checkListItemId,
    checkListId,
    isEditing,
    closeEditMessage,
    checked,
  }: CheckItemMessageProps) => {
  const dispatch = useDispatch();
  const [itemMessage, setItemMessage] = useState(message);
  const [oldMessage, setOldMessage] = useState(message);
  const [isVisibleTooltip, setIsVisibleTooltip] = useState(false);
  const textArea = useRef<HTMLInputElement>(null);
  const titleTaskRef = useRef<HTMLDivElement>(null);

  const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setItemMessage(e.target.value);
    if (e.target.value.length === 0 || e.target.value === '0') {
      setIsVisibleTooltip(true);
    } else {
      setIsVisibleTooltip(false);
    }
  };

  const saveSuccess = () => {
    setOldMessage(itemMessage);
    closeEditMessage();
    alert('Название успешно сохранено', 'success');
  };

  const saveError = () => {
    alert('Не удалось изменить название задачи', 'error');
  };

  const saveTask = () => {
    setIsVisibleTooltip(false);
    const title = itemMessage.replaceAll(' ', '');
    if (title.length > 0) {
      dispatch(TaskFormSlice.changeItemForChecklist({
        data: {
          checkListId,
          checkListItemId,
          message: itemMessage,
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
    setItemMessage(oldMessage);
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
        <div className={styles.title} ref={titleTaskRef} style={checked ? { textDecoration: 'line-through' } : {}}>
          {itemMessage}
        </div>
      </div>
      <div className={isEditing ? styles.visible : styles.hidden}>
        <form onSubmit={handleSubmitForm} className={styles.formEdit}>
          <Tooltip title="Название обязательно" visible={isVisibleTooltip} placement="bottom">
            <input
              placeholder="Название задачи"
              maxLength={150}
              className={styles.textarea}
              ref={textArea}
              onChange={handleChangeTitle}
              value={itemMessage}
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

export default CheckItemMessage;
