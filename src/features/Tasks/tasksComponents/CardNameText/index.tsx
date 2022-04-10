import React from 'react';
import styles from './index.module.scss';

type CardNameTextProps = {
  text: string;
};

const CardNameText = ({ text }: CardNameTextProps) => <span className={styles.text}>{text}</span>;

export default CardNameText;
