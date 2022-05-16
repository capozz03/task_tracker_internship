import React from 'react';
import { Tooltip as AntTooltip, TooltipProps } from 'antd';
import styles from './index.module.scss';

const Tooltip = ({ children, ...props }: TooltipProps) => (
  <AntTooltip {...props} className={styles.tooltip}>
    { children }
  </AntTooltip>
);

export default Tooltip;
