import React, { MouseEventHandler } from 'react';
import styles from '../index.module.scss';
import { TPagination } from '../../../../store/slice/task/entities';

type FooterNotificationsProps = {
  pagination: TPagination;
  showMoreHandle: MouseEventHandler<HTMLButtonElement>;
}

const FooterNotifications = ({ pagination, showMoreHandle } : FooterNotificationsProps) => (
  <footer>
    {
        (pagination.items_total !== 0
          && pagination.items_total > 10
          && pagination.page_current !== pagination.page_total)
        && <button type="button" onClick={showMoreHandle} className={styles.btnShowMore}>Показать больше</button>
      }
  </footer>
);

export default FooterNotifications;
