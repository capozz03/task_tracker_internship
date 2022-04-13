import Button from 'features/Tasks/tasksComponents/Button';
import React from 'react';
import { IconDescription } from 'shared/ui/icons/ReactIcons';
import style from './index.module.scss';

const DescriptionTask = () => {
  const ct = '';
  console.log(ct);
  return (
    <div className={style.taskDescription}>
      <div className={style.headerDescription}>
        <div className={style.iconDescription}>
          <IconDescription />
        </div>
        <h5 className={style.description}>Описание</h5>
        <Button className={style.changeButton} type="default">
          Изменить
        </Button>
      </div>
      <div className={style.placeholderDecription}>
        <p>Введите описание чтобы сделать задачу понятнее</p>
      </div>
    </div>
  );
};

export default DescriptionTask;
