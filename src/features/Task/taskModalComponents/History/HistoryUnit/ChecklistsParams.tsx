import React from 'react';
import { Checkbox } from 'features/Tasks/tasksComponents';
import { THistoryUnit } from 'store/slice/task/taskForm/history/entities';
import { TParams } from '.';
import { historyIcons, CheckboxIcon } from 'shared/ui/icons';
import styles from './index.module.scss';

const { BlockIcon } = historyIcons;

function getChecklistsParams(unit: THistoryUnit): TParams {
  const result: TParams = { title: '', details: '' };

  const getTitle = (text: string) => (
    <>
      { text }
      <span
        className={styles.GeneralSpan}
        style={{
          textDecoration: unit.params.check_list?.title
            ? 'none' : 'line-through',
        }}
      >
        { unit.params.check_list?.title || 'Удаленный чеклист' }
      </span>
    </>
  );

  const getDetailsCheckbox = () => (
    <div className={styles.ChecklistContainer}>
      { unit.params.message ? <CheckboxIcon /> : <BlockIcon /> }
      { unit.params.message || 'Удаленный пункт' }
    </div>
  );

  switch (unit.command_code) {
    case 'task.check_list_assign':
      result.title = getTitle('добавление чеклиста к задаче');
      break;
    case 'task.check_list_un_assign':
      result.title = getTitle('удаление чеклиста у задачи');
      break;
    case 'check_list.item_change_complete':
      result.title = getTitle('изменение состояния пункта чеклиста');
      result.details = (
        <div className={styles.ChecklistContainer}>
          {
            unit.params.check_list_item
              ? <Checkbox checked={unit.params.complete} />
              : <BlockIcon />
          }
          { unit.params.check_list_item?.message || 'Удаленный пункт' }
        </div>
      );
      break;
    case 'check_list.item_create':
      result.title = getTitle('добавление пункта чеклиста');
      result.details = getDetailsCheckbox();
      break;
    case 'check_list.item_delete':
      result.title = getTitle('удаление пункта чеклиста');
      result.details = getDetailsCheckbox();
      break;
    case 'check_list.item_change_message':
      result.title = getTitle('изменение текста пункта чеклиста');
      result.details = getDetailsCheckbox();
      break;
    case 'check_list.item_position_set':
      result.title = getTitle('изменение позиции пункта чеклиста');
      result.details = getDetailsCheckbox();
      break;
    case 'check_list.title_change':
      result.title = getTitle('изменение заголовка чеклиста на');
      break;
    default:
      break;
  }

  return result;
}

export default getChecklistsParams;
