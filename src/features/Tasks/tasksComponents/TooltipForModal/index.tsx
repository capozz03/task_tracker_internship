import React from 'react';
import { Tooltip as AntTooltip, TooltipProps } from 'antd';
import './index.module.scss';

const Tooltip = ({ children, ...props }: TooltipProps) => (
  <AntTooltip {...props} getPopupContainer={() => document.querySelector('.ant-modal-wrap') as HTMLElement}>
    { children }
  </AntTooltip>
);

export default Tooltip;
