import React from 'react';
import { Tooltip as AntTooltip, TooltipProps } from 'antd';
import './index.module.scss';
import { isMobile } from 'react-device-detect';

type AppTooltipProps = TooltipProps & {
  ignoreTouchDevice?: boolean;
}

const Tooltip = ({ children, visible, ignoreTouchDevice = false, ...props }: AppTooltipProps) => (
  <AntTooltip
    visible={(!isMobile || ignoreTouchDevice) && visible}
    {...props}
    getPopupContainer={() => document.querySelector('.ant-modal-wrap') as HTMLElement}
  >
    { children }
  </AntTooltip>
);

export default Tooltip;
