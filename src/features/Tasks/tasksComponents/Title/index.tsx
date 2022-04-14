import React, {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './index.module.scss';
import PencilIcon from 'shared/ui/icons/PencilIcon';
import { useDispatch } from 'react-redux';
import { setTitleAsync } from 'store/slice/task/taskForm';
import { Tooltip } from 'antd';
import PlusIcons from 'shared/ui/icons/PlusIcons';
import CancelIcons from 'shared/ui/icons/CancelIcons';
import { useBreakPoint } from 'shared/helpers/hooks/useBreakPoint';

type titleProps = {
  title: string,
  taskId: string,
}

const Title = ({ title, taskId }: titleProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isVisibleTooltip, setIsVisibleTooltip] = useState(false);
  const [titleTask, setTitleTask] = useState(title);
  const [isVisibleFullText, setIsVisibleFullText] = useState(true);
  const [oldTitle, setOldTitle] = useState(title);
  const dispatch = useDispatch();
  const textArea = useRef<HTMLTextAreaElement>(null);
  const titleTaskRef = useRef<HTMLDivElement>(null);

  const calculationHeight = () => {
    if (textArea.current!.scrollHeight > textArea.current!.offsetHeight) {
      textArea.current!.style.height = `${textArea.current!.scrollHeight + 5}px`;
    }
  };
  const handleEditor: MouseEventHandler<HTMLButtonElement> = () => {
    setIsEdit(true);
    setOldTitle(titleTask);
    textArea.current!.style.height = `${titleTaskRef.current!.offsetHeight + 5}px`;
  };
  const handleChangeTitle: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setTitleTask(() => e.target.value);
    if (e.target.value.length === 0 || e.target.value === '0') {
      setIsVisibleTooltip(true);
    } else {
      setIsVisibleTooltip(false);
    }
  };

  const saveSuccess = () => {
    setOldTitle(titleTask);
    setIsEdit(false);
  };

  const saveError = () => {
    // alert('Ошибка');
  };

  const saveTask = () => {
    setIsVisibleTooltip(false);
    setTitleTask(() => titleTask.trim());
    if (titleTask.length > 0 && titleTask !== '0') {
      dispatch(setTitleAsync({
        data: {
          title: titleTask,
          taskId,
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

  const handlePlusClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    saveTask();
  };

  const handleCancelClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setTitleTask(() => oldTitle);
    setIsEdit(false);
    setIsVisibleTooltip(false);
  };

  const handleKeyDownEnter: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTask();
    }
  };

  const handleClickEllipsis: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsVisibleFullText(false);
  };

  useEffect(() => {
    calculationHeight();
  }, [titleTask]);

  return (
    <div>
      <div className={isEdit ? styles.hidden : styles.visible}>
        <div className={styles.title} ref={titleTaskRef}>
          {
            useBreakPoint(1000) && titleTask.length > 70 && isVisibleFullText
              ? titleTask.slice(0, 70)
              : titleTask
          }
          { useBreakPoint(1000) && titleTask.length > 70 && isVisibleFullText && <button type="button" className={styles.ellipsis} onClick={handleClickEllipsis}>...</button> }
          <button type="button" id="changeBtn" className={styles.btnEdit} onClick={handleEditor}>
            <PencilIcon color="#B5B5BE" />
          </button>
        </div>
      </div>
      <div className={isEdit ? styles.visible : styles.hidden}>
        <form onSubmit={handleSubmitForm} className={styles.formEdit}>
          <Tooltip title="Название обязательно" visible={isVisibleTooltip} placement="bottom">
            <textarea
              maxLength={150}
              className={styles.textarea}
              ref={textArea}
              onChange={handleChangeTitle}
              value={titleTask}
              onKeyDown={handleKeyDownEnter}
            />
          </Tooltip>
          <div className={styles.btnGroup}>
            <button type="button" onClick={handlePlusClick}>
              <PlusIcons />
            </button>
            <button type="button" onClick={handleCancelClick}>
              <CancelIcons />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Title;
