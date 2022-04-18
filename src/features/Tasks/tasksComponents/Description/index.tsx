import Button from 'features/Tasks/tasksComponents/Button';
import React, { useState } from 'react';
import { IconDescription } from 'shared/ui/icons/TasksIcons';
import DescriptionEditor from './DescriptionEditor';
import style from './index.module.scss';

type descriptionProps = {
  description: string;
  taskId: string;
};

const Description = ({ description, taskId }: descriptionProps) => {
  const [isVisibleEditor, setIsVisibleEditor] = useState<boolean>(false);
  const [content, setContent] = useState<string>(description);

  const checkDescriptionIsEmpty = (): string => {
    if (!description) {
      return 'Введите описание чтобы сделать задачу понятнее';
    } return description;
  };

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
          <div
            className={style.content}
            dangerouslySetInnerHTML={{ __html: checkDescriptionIsEmpty() }}
          />
        )}
      </div>
    </div>
  );
};

export default Description;
