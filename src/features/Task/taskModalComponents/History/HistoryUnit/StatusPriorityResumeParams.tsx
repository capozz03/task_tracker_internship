import React from 'react';
import { taskStatuses } from 'features/Tasks/tasksComponents/TaskStatus/constants';
import { THistoryUnit } from 'store/slice/task/taskForm/history/entities';
import { TParams } from '.';
import styles from './index.module.scss';

const priorityColors = [
  {
    name: 'Высокий',
    color: '#FC5A5A',
  },
  {
    name: 'Средний',
    color: '#FF974A',
  },
  {
    name: 'Низкий',
    color: '#82C43C',
  },
];

function getStatusPriorityResumeParams(unit: THistoryUnit): TParams {
  const result: TParams = { title: '', details: '' };

  switch (unit.command_code) {
    case 'task.status_change':
      result.title = 'смена статуса на';
      result.details = (
        <div className={styles.StatusContainer}>
          <span
            className={styles.Status}
            style={{
              backgroundColor: taskStatuses.find(
                (el) => el.status === unit.params.status?.name)?.color || '#D5D5DC',
            }}
          >
            { unit.params.status?.name || 'Неизвестный статус' }
          </span>
        </div>
      );
      break;
    case 'task.priority_change':
      result.title = 'смена приоритета на';
      result.details = (
        <div className={styles.PriorityContainer}>
          <span
            className={styles.PriorityRound}
            style={{
              backgroundColor: priorityColors.find(
                (el) => el.name === unit.params.priority?.name)?.color || '#D5D5DC',
            }}
          />
          <span className={styles.PriorityText}>
            { unit.params.priority?.name || 'Нет приоритета' }
          </span>
        </div>
      );
      break;
    case 'task.form_result_change':
      result.title = 'изменение полей формы';
      result.details = (
        <div className={styles.ResumeContainer}>
          <div className={styles.Resume}>
            <p className={styles.Title}>Резюме: </p>
            <p className={styles.Content}>
              { unit.params.form_result?.filter((field) => field.field_name === 'resume')[0].value }
            </p>
          </div>
          <div className={styles.Comment}>
            <p className={styles.Title}>Комментарий: </p>
            <p className={styles.Content}>
              { unit.params.form_result?.filter((field) => field.field_name === 'comment')[0].value }
            </p>
          </div>
        </div>
      );
      break;
    default:
      break;
  }

  return result;
}

export default getStatusPriorityResumeParams;
