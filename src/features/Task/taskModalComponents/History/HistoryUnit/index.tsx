import React, { useEffect, useState } from 'react';
import { formatDateOnTaskHistoryView } from 'shared/helpers/convert';
import { THistoryUnit } from 'store/slice/task/taskForm/history/entities';
import { roleParams } from './Params/RolesParams';
import { generalParams } from './Params/GeneralParams';
import { dateParams } from './Params/DatesParams';
import { tagParams } from './Params/TagParams';
import { checklistParams } from './Params/ChecklistsParams';
import { fileParams } from './Params/FilesParams';
import HistoryUnitTitle from './HistoryUnitTitle';
import HistoryUnitDetails from './HistoryUnitDetails';
import styles from './index.module.scss';
import UserAvatarForModal from 'features/Tasks/tasksComponents/UserAvatarForModal';

type TProps = {
  unit: THistoryUnit;
};

export type TTitleProps = {
  type: 'string' | 'checklist' | 'general' | 'task' | 'clone';
  text: string;
  alt?: string;
};

export type TDetailsProps = {
  type: 'checkbox' |
        'checkboxChangeComplete' |
        'checkboxSetPosition' |
        'dateStart' |
        'dateStop' |
        'file' |
        'role' |
        'status' |
        'priority' |
        'resume' |
        'tag' |
        'empty';
  roleType?: 'add' | 'remove';
  tagType?: 'add' | 'remove';
};

export type TParams = {
  title: TTitleProps;
  details: TDetailsProps;
};

const HistoryUnit = ({ unit }: TProps) => {
  const [params, setParams] = useState<TParams | undefined>();

  useEffect(() => {
    switch (unit.command_code) {
      case 'task.role_assign':
      case 'task.role_un_assign':
        setParams(roleParams[unit.command_code]);
        break;
      case 'task.title_change':
      case 'task.description_change':
      case 'task.create':
      case 'task.clone':
      case 'task.status_change':
      case 'task.priority_change':
      case 'task.form_result_change':
        setParams(generalParams[unit.command_code]);
        break;
      case 'task.exec_start_change':
      case 'task.exec_stop_change':
        setParams(dateParams[unit.command_code]);
        break;
      case 'task.tag_assign':
      case 'task.tag_un_assign':
        setParams(tagParams[unit.command_code]);
        break;
      case 'task.check_list_assign':
      case 'task.check_list_un_assign':
      case 'check_list.item_change_complete':
      case 'check_list.item_create':
      case 'check_list.item_delete':
      case 'check_list.item_change_message':
      case 'check_list.item_position_set':
      case 'check_list.title_change':
        setParams(checklistParams[unit.command_code]);
        break;
      case 'task.storage_file_assign':
      case 'task.storage_file_un_assign':
        setParams(fileParams[unit.command_code]);
        break;
      default:
        break;
    }
  }, [unit]);

  if (!params) return <span />;

  return (
    <li className={styles.historyItem}>
      <div className={styles.action}>
        <UserAvatarForModal user={unit.user} color="#FFC28A" />
        <p className={styles.actionTitle}>
          <span className={styles.actionUserName}>{unit.user.name}</span>
          <span className={styles.actionDescription}>
            <HistoryUnitTitle unit={unit} {...params.title} />
          </span>
        </p>
        <div className={styles.actionDetails}>
          <HistoryUnitDetails unit={unit} {...params.details} />
        </div>
      </div>
      <div className={styles.actionTime}>
        {formatDateOnTaskHistoryView(unit.created)}
      </div>
    </li>
  );
};

export default HistoryUnit;
