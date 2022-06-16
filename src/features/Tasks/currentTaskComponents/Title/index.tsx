import React, {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from 'features/Tasks/currentTaskComponents/Title/index.module.scss';
import PencilIcon from 'shared/ui/icons/PencilIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setTitleAsync } from 'store/slice/task/taskForm';
import { Tooltip } from 'antd';
import PlusIcons from 'shared/ui/icons/PlusIcons';
import CancelIcons from 'shared/ui/icons/CancelIcons';
import { useBreakPoint } from 'shared/helpers/hooks/useBreakPoint';
import { alert } from 'shared/ui';
import { TaskFormSlice } from 'store/slice';
import { checkPermission } from 'shared/helpers';

type titleProps = {
  title: string,
  taskId: string,
}

const Title = ({ title, taskId }: titleProps) => {
  const dispatch = useDispatch();
  const roles = useSelector(TaskFormSlice.getTaskFormRoles);
  const titleTask = useSelector(TaskFormSlice.getTaskFormTitle) || '';
  const [oldTitle, setOldTitle] = useState(title);
  const [isEdit, setIsEdit] = useState(false);
  const [isVisibleTooltip, setIsVisibleTooltip] = useState(false);
  const [isVisibleFullText, setIsVisibleFullText] = useState(true);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const titleTaskRef = useRef<HTMLDivElement>(null);
  const [can, setCan] = useState({
    edit: checkPermission('change.title', roles),
  });

  useEffect(() => {
    setCan({
      edit: checkPermission('change.title', roles),
    });
  }, [roles]);

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
    dispatch(TaskFormSlice.setTitleFromTaskForm(e.target.value));
    if (e.target.value.length === 0 || e.target.value === '0') {
      setIsVisibleTooltip(true);
    } else {
      setIsVisibleTooltip(false);
    }
  };

  const saveSuccess = () => {
    setOldTitle(titleTask);
    setIsEdit(false);
    alert('Название успешно сохранено', 'success');
  };

  const saveError = () => {
    alert('Не удалось изменить название задачи', 'error');
  };

  const saveTask = () => {
    setIsVisibleTooltip(false);
    let taskTitle = titleTask.trim();
    while (taskTitle.includes('  ')) {
      taskTitle = taskTitle.replaceAll('  ', ' ');
    }
    dispatch(TaskFormSlice.setTitleFromTaskForm(taskTitle));
    if (taskTitle.length > 0) {
      dispatch(setTitleAsync({
        data: {
          title: taskTitle,
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

  const handleCancelClick = () => {
    dispatch(TaskFormSlice.setTitleFromTaskForm(oldTitle));
    setIsEdit(false);
    setIsVisibleTooltip(false);
  };

  const handleKeyDownEnter: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTask();
    }
  };

  const handleClickEllipsis = () => { setIsVisibleFullText(false); };
  useEffect(() => { calculationHeight(); }, [titleTask]);

  return (
    <>
      <div className={isEdit ? styles.hidden : styles.visible}>
        <div className={styles.title} ref={titleTaskRef}>
          {
            useBreakPoint(1000) && titleTask.length > 70 && isVisibleFullText
              ? (
                <button type="button" className={styles.ellipsis} onClick={handleClickEllipsis}>
                  { titleTask.slice(0, 70) }
                  ...
                </button>)
              : titleTask
          }
          {
            can.edit
            && (
              <button type="button" id="changeBtn" className={styles.btnEdit} onClick={handleEditor}>
                <PencilIcon color="#B5B5BE" />
              </button>
            )
          }
        </div>
      </div>
      <div className={isEdit ? styles.visible : styles.hidden}>
        <form onSubmit={handleSubmitForm} className={styles.formEdit}>
          <Tooltip title="Название обязательно" visible={isVisibleTooltip} placement="bottom">
            <textarea
              placeholder="Введите название задачи"
              maxLength={150}
              className={styles.textarea}
              ref={textArea}
              onChange={handleChangeTitle}
              value={titleTask}
              onKeyDown={handleKeyDownEnter}
            />
          </Tooltip>
          <div className={styles.btnGroup}>
            <button type="submit">
              <PlusIcons />
            </button>
            <button type="button" onClick={handleCancelClick}>
              <CancelIcons />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Title;
