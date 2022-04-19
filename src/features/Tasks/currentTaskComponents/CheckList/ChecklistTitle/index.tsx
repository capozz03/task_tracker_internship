import React from 'react';
import CheckboxIcon from 'shared/ui/icons/CheckboxIcon';
import styles from './index.module.scss';

type ChecklistTitleProps = {
  title: string
}

const ChecklistTitle = ({ title }: ChecklistTitleProps) => (
  <div className={styles.title}>
    <CheckboxIcon />
    <span className={styles.titleText}>{ title }</span>
  </div>
);

export default ChecklistTitle;
