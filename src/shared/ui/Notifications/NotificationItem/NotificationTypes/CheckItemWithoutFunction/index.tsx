import React, { FC } from 'react';
import { Checkbox } from 'antd';
import styles from './index.module.scss';

type CheckItemWithoutFunctionProps = {
  completed: boolean;
}

const CheckItemWithoutFunction: FC<CheckItemWithoutFunctionProps> = ({
  children,
  completed,
  ...props }) => (
    <Checkbox checked={completed} className={styles.checkbox} {...props}>
      { children }
    </Checkbox>
);

export default CheckItemWithoutFunction;
