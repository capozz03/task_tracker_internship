import React from 'react';
import { Checkbox as AntCheckbox, CheckboxProps } from 'antd';
import styles from './index.module.scss';

const Checkbox = (props: CheckboxProps) => <AntCheckbox className={styles.label} {...props} />;

export default Checkbox;
