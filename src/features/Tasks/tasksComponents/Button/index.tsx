import React from 'react';
import { Button as AntButton, ButtonProps } from 'antd';
import './index.module.scss';

const Button = (props:ButtonProps) => (
  <AntButton {...props} />
);

export default Button;
