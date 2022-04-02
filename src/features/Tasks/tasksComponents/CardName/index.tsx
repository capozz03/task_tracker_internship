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
  <div className={styles.Card}>
    <span className={styles.Name}>{name}</span>
    <span className={styles.Indicators}>
      <span className={styles.Attachments}>
        <PaperClipOutlined />
        {attachments}
      </span>
      <span className={styles.CheckList}>
        <CheckSquareOutlined />
        {`${checkListChecked}/${checkListTotal}`}
      </span>
    </span>
  </div>
);

export default CardName;
