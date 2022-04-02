import React from 'react';
import { Button as AntButton, ButtonProps } from 'antd';

// Кастомизация в src/shared/assets/styles/index.scss
const Button = (props:ButtonProps) => (
  <AntButton {...props} />
);

export default Button;
