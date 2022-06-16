import React from 'react';
import Tooltip from 'features/Tasks/tasksComponents/TooltipForModal';
import classNames from 'classnames';
import { CancelIcons } from 'shared/ui/icons';
import styles from './index.module.scss';

type TProps = {
  name: string;
  type: 'details' | 'members';
  children: any;
  removeHandler?: ()=>void;
  tooltip?: string;
}

const DetailCategory = ({ name, type, children, removeHandler, tooltip }: TProps) => (
  <div className={styles.category}>
    <div className={styles.titleWrapper}>
      <p
        className={classNames(styles.title, {
          [styles.titleDetails]: type === 'details',
          [styles.titleMembers]: type === 'members',
        })}
      >
        { name }
      </p>
      {
        removeHandler
        && (
        <Tooltip title={tooltip || 'Убрать свойство'}>
          <button type="button" className={styles.removeButton} onClick={removeHandler}>
            <CancelIcons />
          </button>
        </Tooltip>
        )
      }
    </div>
    <div className={styles.labels}>
      {
        children
      }
    </div>
  </div>
);

export default DetailCategory;
