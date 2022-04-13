import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.scss';

type AlertProps = {
  text: string;
};

const Alert = ({ text }: AlertProps) => {
  const notify = () => {
    toast(text, {
      className: styles.container,
      bodyClassName: styles.body,
      progressClassName: styles.progress,

      autoClose: 10000,
    });
  };

  return (
    <div>
      <button type="button" onClick={notify}>Notify</button>
      <ToastContainer />
    </div>
  );
};

export default Alert;
