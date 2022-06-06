import React from 'react';
import { Tooltip as AntTooltip, TooltipProps } from 'antd';
import './index.module.scss';

const Tooltip = ({ children, ...props }: TooltipProps) => (
  <AntTooltip {...props}>
    { children }
  </AntTooltip>
);

export default Tooltip;
