import Button from 'features/Tasks/tasksComponents/Button';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconDescription } from 'shared/ui/icons/TasksIcons';
import { TState } from 'store/configureStore';
import { getTaskByIdAsync } from 'store/slice/task/taskForm';
import DescriptionEditor from '../DescriptionEditor';
import style from './index.module.scss';

const DescriptionTask = ({ taskId }: any) => {
  const [isVisibleEditor, setIsVisibleEditor] = useState<boolean>(false);

  const [content, setContent] = useState<string>('Введите описание чтобы сделать задачу понятнее');

  const dispatch = useDispatch();
  dispatch(getTaskByIdAsync(taskId));
  const descr = useSelector((state: TState) => state.taskForm.task?.description);
  console.log(descr);
  const descriptionEditor = (): void => {
    setIsVisibleEditor(true);
  };
  return (
    <div className={style.taskDescription}>
      <div className={style.headerDescription}>
        <div className={style.iconDescription}>
          <IconDescription />
        </div>
        <h5 className={style.description}>Описание</h5>
        <Button className={style.changeButton} onClick={descriptionEditor} type="default">
          Изменить
        </Button>
      </div>
      <div className={style.placeholderDecription}>
        {isVisibleEditor ? (
          <DescriptionEditor
            setIsVisibleEditor={setIsVisibleEditor}
            setContent={setContent}
            content={content}
            taskId={taskId}
          />
        ) : (
          <div className={style.content} dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>

    </div>
  );
};

export default DescriptionTask;
