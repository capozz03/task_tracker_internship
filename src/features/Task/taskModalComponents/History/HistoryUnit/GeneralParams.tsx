import React from 'react';
import { THistoryUnit } from 'store/slice/task/taskForm/history/entities';
import { TParams } from '.';
import styles from './index.module.scss';

function getGeneralParams(unit: THistoryUnit): TParams {
  const result: TParams = { title: '', details: '' };

  switch (unit.command_code) {
    case 'task.title_change':
      result.title = (
        <>
          редактирование заголовка
          <span className={styles.GeneralSpan}>
            { unit.params.title || 'Неизвестный заголовок' }
          </span>
        </>
      );
      break;
    case 'task.description_change':
      result.title = 'редактирование описания';
      break;
    case 'task.create':
      result.title = (
        <>
          создание задачи
          <span className={styles.GeneralSpan}>
            { unit.params.title }
          </span>
        </>
      );
      break;
    case 'task.clone':
      result.title = (
        <>
          дублирование задачи
          <span className={styles.GeneralSpan}>
            { unit.params.task_from?.title || 'Задача удалена' }
          </span>
        </>
      );
      break;
    default:
      break;
  }

  return result;
}

export default getGeneralParams;
