import Button from 'features/Tasks/tasksComponents/Button';
import React, { useState } from 'react';
import { IconDescription } from 'shared/ui/icons/ReactIcons';
import DescriptionEditor from '../DescriptionEditor';
import style from './index.module.scss';

const DescriptionTask = () => {
  const [isVisibleEditor, setIsVisibleEditor] = useState<boolean>(false);
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
          <DescriptionEditor setIsVisibleEditor={setIsVisibleEditor} />
        ) : (
          <p>Введите описание чтобы сделать задачу понятнее</p>
        )}
      </div>
    </div>
  );
};

export default DescriptionTask;
