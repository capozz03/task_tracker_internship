import React from 'react';
import styles from './index.module.scss';
import { CheckSquareOutlined } from '@ant-design/icons';

type CardChecklistCountProps = {
  checkListTotal: number;
  checkListChecked: number;
};

const CardChecklistCount = ({ checkListTotal, checkListChecked }: CardChecklistCountProps) => (
  <span className={styles.checkList}>
    <CheckSquareOutlined />
    {`${checkListChecked}/${checkListTotal}`}
  </span>
);

export default CardChecklistCount;
