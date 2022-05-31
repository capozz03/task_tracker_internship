/* eslint-disable  */
import React from 'react';
import { UserAvatar } from 'features/Tasks/tasksComponents';
import { formatDateOnTaskHistoryView } from 'shared/helpers/convert';
import { THistoryUnit } from 'store/slice/task/taskForm/history/entities';
import styles from '../index.module.scss';

type TProps = {
  unit: THistoryUnit;
};

function HistoryUnit({ unit }: TProps) {
  const getUnitStruct = (unit: THistoryUnit) => {
    switch (unit.command_code) {
      case 'task.role_assign':
        return {
          text: 'назначение роли'
        }
    }
  }; 

  return (
    <li className={styles.historyItem}>
      <div className={styles.action}>
        <div>
          <UserAvatar user={unit.user} color="#FFC28A" />
          <span className={styles.actionUserName}>{unit.user.name}</span>
        </div>
        <span className={styles.actionDescription}>{unit.command_name.toLowerCase()}</span>
      </div>
      <div className={styles.actionTime}>
        {formatDateOnTaskHistoryView(unit.created)}
      </div>
    </li>
);
}

export default HistoryUnit;