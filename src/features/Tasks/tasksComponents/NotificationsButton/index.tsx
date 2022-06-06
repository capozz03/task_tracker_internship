import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

type NotificationsButtonProps = {
  active: boolean;
};

const NotificationsButton = ({ active }: NotificationsButtonProps) => (
  <div className={classNames(styles.button, active ? styles.active : '')}>
    <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2876 3.14096C12.1102 1.65338 10.8442 0.5 9.30884 0.5C7.7735 0.5 6.50754 1.65336 6.33011 3.14092C3.82742 4.27543 2.08658 6.79553 2.08658 9.72222V14.7399L0.416077 18.0494C0.080354 18.7145 0.563755 19.5 1.3088 19.5H6.47954C6.89138 20.6652 8.00262 21.5 9.30884 21.5C10.6151 21.5 11.7263 20.6652 12.1381 19.5H17.3088C18.0538 19.5 18.5372 18.7145 18.2015 18.0494L16.531 14.7399V9.72222C16.531 6.79556 14.7902 4.27549 12.2876 3.14096ZM14.6383 15.4286L15.6839 17.5H2.93372L3.97929 15.4286C4.04982 15.2888 4.08656 15.1345 4.08656 14.978V9.72222C4.08656 6.83807 6.42463 4.5 9.30879 4.5C12.1929 4.5 14.531 6.83807 14.531 9.72222V14.978C14.531 15.1345 14.5678 15.2888 14.6383 15.4286Z"
        fill="#92929D"
      />
    </svg>
    <span className={styles.notification} />
  </div>
);

export default NotificationsButton;
