/* eslint-disable  */
import React, { useEffect, useState } from 'react';
import { UserAvatar } from 'features/Tasks/tasksComponents';
import { formatDate, formatDateOnTaskHistoryView } from 'shared/helpers/convert';
import { THistoryUnit } from 'store/slice/task/taskForm/history/entities';
import moment from 'moment';
import styles from './index.module.scss';

type TProps = {
  unit: THistoryUnit;
};

function HistoryUnit({ unit }: TProps) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    switch (unit.command_code) {
      case 'task.role_assign':
        setTitle(`назначение роли 
        "${unit.params.assign_user?.name || 'Неизвестный пользователь'},
         ${unit.params.task_role?.name || 'Неизвестная роль'}"`);
        break;
      case 'task.role_un_assign':
        setTitle(`снятие с роли 
        "${unit.params.assign_user?.name || 'Неизвестный пользователь'},
         ${unit.params.task_role?.name || 'Неизвестная роль'}"`);
        break;
      case 'subscribe.subscribe_create':
        setTitle('подписка на события')
        break;
      case 'subscribe.subscribe_delete':
        setTitle('отмена подписки на события')
        break;
      case 'task.title_change':
        setTitle(`редактирование заголовка "${unit.params.title || 'Неизвестный заголовок'}"`);
        break;
      case 'task.status_change':
        setTitle(`смена статуса на "${unit.params.status?.name || 'Неизвестный статус'}"`);
        break;
      case 'task.exec_start_change':
        setTitle(`изменение времени начала ${
          unit.params.exec_start 
            ? formatDate(moment(unit.params.exec_start))
            : '"удалена"'
        }`);
        break;
      case 'task.exec_stop_change':
        setTitle(`изменение времени окончания ${
          unit.params.exec_stop 
            ? formatDate(moment(unit.params.exec_stop))
            : '"удалена"'
        }`);
        break;
      case 'task.tag_assign':
        setTitle(`добавление тега "${unit.params.tag?.name || 'Неизвестный тег'}"`)
        break;
      case 'task.tag_un_assign':
        setTitle(`снятие тега "${unit.params.tag?.name || 'Неизвестный тег'}"`)
        break;
      case 'task.priority_change':
        setTitle(`смена приоритета на "${unit.params.priority?.name || 'Нет приоритета'}"`);
        break;
      case 'task.description_change':
        setTitle('редактирование описания');
        break;
      case 'task.form_result_change':
        setTitle(`изменение полей формы, 
          резюме: "${unit.params.form_result?.filter((field) => field.field_name === 'resume')[0].value}",
          комментарий: "${unit.params.form_result?.filter((field) => field.field_name === 'comment')[0].value}"
        `);
        break;
      case 'task.check_list_assign':
        setTitle(`добавление чеклиста к задаче "${unit.params.check_list?.title || 'Чеклист удален'}"`);
        break;
      case 'task.check_list_un_assign':
        setTitle(`удаление чеклиста у задачи "${unit.params.check_list?.title || 'Чеклист удален'}"`);
        break;
      case 'check_list.item_change_complete':
        setTitle(`изменение состояния пункта чеклиста 
          "${unit.params.check_list_item?.message || 'Удаленный пункт'}",
          чеклист "${unit.params.check_list?.title || 'Удаленный чеклист'}"`);
        break;
      case 'check_list.item_delete':
        setTitle(`удаление пункта чеклиста 
          "${unit.params.check_list_item?.message || 'Удаленный пункт'}",
          чеклист "${unit.params.check_list?.title || 'Удаленный чеклист'}"`);
        break;
      case 'check_list.item_change_message':
        setTitle(`изменение текста пункта чеклиста 
          "${unit.params.check_list_item?.message || 'Удаленный пункт'}",
          чеклист "${unit.params.check_list?.title || 'Удаленный чеклист'}"`);
        break;
      case 'check_list.item_position_set':
        setTitle(`изменение позиции пункта чеклиста 
          "${unit.params.check_list_item?.message || 'Удаленный пункт'}",
          чеклист "${unit.params.check_list?.title || 'Удаленный чеклист'}"`);
        break;
      case 'check_list.title_change':
        setTitle(`изменение заголовка чеклиста на "${unit.params.check_list?.title || 'Удаленный чеклист'}"`);
        break;
      case 'task.create':
        setTitle(`создание задачи "${unit.params.title}"`);
        break;
      case 'task.clone':
        setTitle(`дублирование задачи "${unit.params.task_from?.title}"`);
        break;
      case 'task.storage_file_assign':
        setTitle(`добавление файла "${unit.params.storage_file?.name_original}"`);
        break;
      case 'task.storage_file_un_assign':
        setTitle(`удаление файла "${unit.params.storage_file?.name_original}"`);
        break;
      default:
        break;
    }
  }, [unit]);

  return (
    <li className={styles.historyItem}>
      <div className={styles.action}>
        <UserAvatar user={unit.user} color="#FFC28A"/>
        <p className={styles.actionTitle}>
          <span className={styles.actionUserName}>{unit.user.name}</span>
          <span className={styles.actionDescription}>{ title }</span>
        </p>
        <div className={styles.actionDetails}>
          { details }
        </div>
      </div>
      <div className={styles.actionTime}>
        {formatDateOnTaskHistoryView(unit.created)}
      </div>
    </li>
);
}

export default HistoryUnit;