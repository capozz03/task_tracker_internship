import React from 'react';
import styles from './index.module.scss';
import Tooltip from '../Tooltip';

type CardNameTextProps = {
  text: string;
};

const CardNameText = ({ text }: CardNameTextProps) => (
  <Tooltip title={text} mouseEnterDelay={0.6}>
    <span className={styles.text}>{text}</span>
  </Tooltip>
);

export default CardNameText;
