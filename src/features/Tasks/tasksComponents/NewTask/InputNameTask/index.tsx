import React from 'react';
import styles from './index.module.scss';

const InputNameTask = ({ ...props }: React.HTMLProps<HTMLInputElement>) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <input type="text" onChange={onChange} className={styles.input} {...props} />
  );
};

export default InputNameTask;
