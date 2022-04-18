import React from 'react';
import { Tooltip as AntTooltip, TooltipProps } from 'antd';
import styles from './index.module.scss';

const Tooltip = (props: TooltipProps) => (
  <div>
    <AntTooltip {...props} className={styles.tooltip}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      { props.children }
    </AntTooltip>
  </div>
);

export default Tooltip;
