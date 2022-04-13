import React from 'react';
import styles from './index.module.scss';
import { PaperClipOutlined } from '@ant-design/icons';

type CardAttachmentsCountProps = {
  count: number;
};

const CardAttachmentsCount = ({ count = 0 }: CardAttachmentsCountProps) => (
  <span className={styles.attachments}>
    <PaperClipOutlined />
    {count}
  </span>
);

export default CardAttachmentsCount;
