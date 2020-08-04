import React from 'react';
import { Button as AntButton } from 'antd';

function Button({ children, ...props }) {
  return (
    <AntButton {...props}>
      {children}
    </AntButton>
  );
}

export default Button;
