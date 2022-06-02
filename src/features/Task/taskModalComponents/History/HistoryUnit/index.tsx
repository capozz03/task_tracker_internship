import React, { ReactNode, useEffect, useState } from 'react';
import { UserAvatar } from 'features/Tasks/tasksComponents';
import { formatDateOnTaskHistoryView } from 'shared/helpers/convert';
import { THistoryUnit } from 'store/slice/task/taskForm/history/entities';
import styles from './index.module.scss';
import getRolesParams from './RolesParams';
import getGeneralParams from './GeneralParams';
import getDatesParams from './DatesParams';
import getTagParams from './TagParams';
import getChecklistsParams from './ChecklistsParams';
import getFilesParams from './FilesParams';
import getStatusPriorityResumeParams from './StatusPriorityResumeParams';

type TProps = {
  unit: THistoryUnit;
};

export type TParams = {
  title: string | ReactNode,
  details: string | ReactNode
};

const HistoryUnit = ({ unit }: TProps) => {
  const [params, setParams] = useState<TParams>({ title: '', details: '' });

  useEffect(() => {
    switch (unit.command_code) {
      case 'task.role_assign':
      case 'task.role_un_assign':
        setParams(getRolesParams(unit));
        break;
      case 'task.title_change':
      case 'task.description_change':
      case 'task.create':
      case 'task.clone':
        setParams(getGeneralParams(unit));
        break;
      case 'task.exec_start_change':
      case 'task.exec_stop_change':
        setParams(getDatesParams(unit));
        break;
      case 'task.tag_assign':
      case 'task.tag_un_assign':
        setParams(getTagParams(unit));
        break;
      case 'task.check_list_assign':
      case 'task.check_list_un_assign':
      case 'check_list.item_change_complete':
      case 'check_list.item_create':
      case 'check_list.item_delete':
      case 'check_list.item_change_message':
      case 'check_list.item_position_set':
      case 'check_list.title_change':
        setParams(getChecklistsParams(unit));
        break;
      case 'task.storage_file_assign':
      case 'task.storage_file_un_assign':
        setParams(getFilesParams(unit));
        break;
      case 'task.status_change':
      case 'task.priority_change':
      case 'task.form_result_change':
        setParams(getStatusPriorityResumeParams(unit));
        break;
      default:
        break;
    }
  }, [unit]);

  return (
    <li className={styles.historyItem}>
      <div className={styles.action}>
        <UserAvatar user={unit.user} color="#FFC28A" />
        <p className={styles.actionTitle}>
          <span className={styles.actionUserName}>{unit.user.name}</span>
          <span className={styles.actionDescription}>{ params.title }</span>
        </p>
        <div className={styles.actionDetails}>
          { params.details }
        </div>
      </div>
      <div className={styles.actionTime}>
        {formatDateOnTaskHistoryView(unit.created)}
      </div>
    </li>
  );
};

export default HistoryUnit;
