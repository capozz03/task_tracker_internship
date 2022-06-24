import React, { MouseEventHandler } from 'react';
import styles from '../index.module.scss';
import { TPagination } from 'store/slice/task/entities';

type HeaderNotificationsProps = {
  pagination: TPagination;
  readAllHandle: MouseEventHandler<HTMLButtonElement>;
}

const HeaderNotifications = ({ pagination, readAllHandle }: HeaderNotificationsProps) => (
  <header className={styles.header}>
    <div className={styles.title}>
      Уведомления
      { pagination.items_total !== 0 && <span className={styles.countNotifications}>{ pagination.items_total > 100 ? '99+' : pagination.items_total }</span>}
    </div>
    <div>
      {
          pagination.items_total !== 0
            ? <button className={styles.readAllBtn} onClick={readAllHandle} type="button">Прочитать все</button>
            : <span className={styles.readAllText}>Прочитать все</span>
        }
    </div>
  </header>
);

export default HeaderNotifications;
