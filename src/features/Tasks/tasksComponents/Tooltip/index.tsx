import React from 'react';
import { Tooltip as AntTooltip, TooltipProps } from 'antd';
import './index.module.scss';

const Tooltip = ({ children, ...props }: TooltipProps) => (
  <AntTooltip {...props} getPopupContainer={() => document.querySelector('.ant-layout') as HTMLElement}>
    { children }
  </AntTooltip>
);

export default Tooltip;
