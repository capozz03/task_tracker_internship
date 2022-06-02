import moment from 'moment';
import React from 'react';
import { formatDate } from 'shared/helpers';
import { DatePickerIcon } from 'shared/ui/icons/DetailsIcons';
import { THistoryUnit } from 'store/slice/task/taskForm/history/entities';
import { TParams } from '.';
import styles from './index.module.scss';

function getDatesParams(unit: THistoryUnit): TParams {
  const result: TParams = { title: '', details: '' };

  switch (unit.command_code) {
    case 'task.exec_start_change':
      result.title = 'изменение даты начала';
      result.details = (
        <div className={styles.DatesContainer}>
          <DatePickerIcon />
          <span className={styles.DatesDate}>
            {
            unit.params.exec_start
              ? formatDate(moment(unit.params.exec_start))
              : 'дата удалена'
            }
          </span>
        </div>
      );
      break;
    case 'task.exec_stop_change':
      result.title = 'изменение даты окончания';
      result.details = (
        <div className={styles.DatesContainer}>
          <DatePickerIcon />
          <span className={styles.DatesDate}>
            {
            unit.params.exec_stop
              ? formatDate(moment(unit.params.exec_stop))
              : 'дата удалена'
            }
          </span>
        </div>
      );
      break;
    default:
      break;
  }

  return result;
}

export default getDatesParams;
