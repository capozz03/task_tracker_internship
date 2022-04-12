import React, {
  ChangeEventHandler, FocusEventHandler,
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
import { setTitleAsync } from 'store/slice/task/currentTask';

type titleProps = {
  title: string,
  taskId: string,
}

const Title = ({ title, taskId }: titleProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [titleTask, setTitleTask] = useState(title);
  const dispatch = useDispatch();
  const oldTitle = useRef(title);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const titleTaskRef = useRef<HTMLDivElement>(null);
  const calculationHeight = () => {
    textArea.current!.style.height = `${textArea.current!.scrollHeight}px`;
  };
  const handleEditor: MouseEventHandler<HTMLButtonElement> = () => {
    setIsEdit(true);
    oldTitle.current = title;
    const element = textArea.current;
    element?.focus();
    element?.setSelectionRange(element?.value.length, element?.value.length);
    textArea.current!.style.height = `${titleTaskRef.current!.offsetHeight + 10}px`;
  };
  const handleChangeTitle: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setTitleTask(e.target.value);
  };
  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = () => {
    setTitleTask(oldTitle.current);
    setIsEdit(false);
  };
  const saveTask = () => {
    setTitleTask(titleTask.trim());
    if (titleTask.length > 0 && !!titleTask) {
      dispatch(setTitleAsync({ title: titleTask, taskId }));
      setIsEdit(false);
    }
  };
  const handleSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    saveTask();
  };
  const handleKeyDownEnter: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTask();
    }
  };

  useEffect(() => {
    calculationHeight();
  }, [titleTask]);

  return (
    <div>
      <div className={isEdit ? styles.hidden : styles.visible}>
        <div className={styles.title} ref={titleTaskRef}>
          {titleTask}
          <button type="button" id="changeBtn" className={styles.btnEdit} onClick={handleEditor}>
            <PencilIcon color="#B5B5BE" />
          </button>
        </div>
      </div>
      <div className={isEdit ? styles.visible : styles.hidden}>
        <form onSubmit={handleSubmitForm}>
          <textarea
            maxLength={150}
            className={styles.textarea}
            ref={textArea}
            onChange={handleChangeTitle}
            value={titleTask}
            onKeyDown={handleKeyDownEnter}
            onBlur={handleBlur}
          />
        </form>
      </div>
    </div>
  );
};

export default Title;
