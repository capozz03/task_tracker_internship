import React from 'react';
import { Tooltip as AntTooltip, TooltipProps } from 'antd';
import { isMobile } from 'react-device-detect';
import './index.module.scss';

type AppTooltipProps = TooltipProps & {
  ignoreTouchDevice?: boolean;
}

const Tooltip = ({ children, visible, ignoreTouchDevice = false, ...props }: AppTooltipProps) => (
  <AntTooltip
    visible={(!isMobile || ignoreTouchDevice) && visible}
    {...props}
    getPopupContainer={() => document.querySelector('.ant-layout') as HTMLElement}
  >
    { children }
  </AntTooltip>
);

export default Tooltip;
