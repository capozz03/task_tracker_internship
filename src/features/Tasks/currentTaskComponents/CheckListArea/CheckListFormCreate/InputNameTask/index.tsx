import React from 'react';
import styles from './index.module.scss';

const InputNameTask = ({ ...props }: React.HTMLProps<HTMLInputElement>) => <input type="text" autoComplete="off" maxLength={40} className={styles.input} {...props} />;

export default InputNameTask;
