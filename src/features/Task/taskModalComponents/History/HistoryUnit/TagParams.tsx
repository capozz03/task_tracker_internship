import React from 'react';
import { THistoryUnit } from 'store/slice/task/taskForm/history/entities';
import { TParams } from '.';
import { historyIcons } from 'shared/ui/icons';
import styles from './index.module.scss';
import { Tag } from 'features/Tasks/tasksComponents';

const { CheckIcon, CrossIcon } = historyIcons;

function getTagParams(unit: THistoryUnit): TParams {
  const result: TParams = { title: '', details: '' };

  switch (unit.command_code) {
    case 'task.tag_assign':
      result.title = 'добавление тега';
      result.details = (
        <div className={styles.TagContainer}>
          <CheckIcon />
          {
            unit.params.tag
              ? <Tag tag={unit.params.tag} />
              : <Tag tag={{ task_tag_id: '-1', name: 'Тег не найден', color: '#B5B5BE' }} />
          }
        </div>
      );
      break;
    case 'task.tag_un_assign':
      result.title = 'снятие тега';
      result.details = (
        <div className={styles.TagContainer}>
          <CrossIcon />
          {
            unit.params.tag
              ? <Tag tag={unit.params.tag} />
              : <Tag tag={{ task_tag_id: '-1', name: 'Тег не найден', color: '#B5B5BE' }} />
          }
        </div>
      );
      break;
    default:
      break;
  }

  return result;
}

export default getTagParams;
