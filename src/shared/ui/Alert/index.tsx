import React from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { icons } from 'shared';
import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.scss';

type TAlertType = 'success' | 'warning' | 'error' | 'info' | 'remove';

type TAlertButtons = {
  text: string;
  action: () => void;
};

const toastStyle = {
  success: {
    icon: icons.alertIcons.AlertSuccessIcon,
    progressClass: styles.progressSuccess,
  },
  warning: {
    icon: icons.alertIcons.AlertWarningIcon,
    progressClass: styles.progressWarning,
  },
  error: {
    icon: icons.alertIcons.AlertErrorIcon,
    progressClass: styles.progressError,
  },
  info: {
    icon: icons.alertIcons.AlertInfoIcon,
    progressClass: styles.progressInfo,
  },
  remove: {
    icon: icons.alertIcons.AlertRemoveIcon,
    progressClass: styles.progressRemove,
  },
};

const alertBody = (alertText: string, buttons: Array<TAlertButtons>) => (
  <>
    <span>{ alertText }</span>
    {
      buttons.map(
        (btn) => <button className={styles.button} type="button" onClick={btn.action}>{btn.text}</button>,
      )
    }
  </>
);

export const alert = (text: string, type: TAlertType = 'info', buttons: Array<TAlertButtons> = []) => {
  toast(
    alertBody(text, buttons),
    {
      className: styles.container,
      bodyClassName: classNames(styles.body, { [styles.bodyRemoveAlert]: (type === 'remove') }),
      progressClassName: classNames(styles.progress, toastStyle[type].progressClass),
      icon: toastStyle[type].icon,

      autoClose: 6000,
      closeButton: icons.alertIcons.AlertCloseButtonIcon,
    });
};
