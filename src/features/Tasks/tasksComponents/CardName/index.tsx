import React from 'react';
import styles from './index.module.scss';
import { CheckSquareOutlined, PaperClipOutlined } from '@ant-design/icons';

type CardNameProps = {
  name: string;
  attachments: number;
  checkListTotal: number;
  checkListChecked: number;
};

const CardName = ({ name, attachments, checkListTotal, checkListChecked }: CardNameProps) => (
  <div className={styles.card}>
    <span className={styles.name}>{name}</span>
    <span className={styles.indicators}>
      <span className={styles.attachments}>
        <PaperClipOutlined />
        {attachments}
      </span>
      <span className={styles.checkList}>
        <CheckSquareOutlined />
        {`${checkListChecked}/${checkListTotal}`}
      </span>
    </span>
  </div>
);

export default CardName;
