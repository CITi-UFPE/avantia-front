import React from 'react';
import { ButtonProps } from 'antd/lib/button/button';

import { StyledButton } from './Button.style';

function Button({ children, ...props }: ButtonProps) {
  return (
    <StyledButton type="default" {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
