import React from 'react';

import { Anchor } from './Link.style';

type LinkProps = {
  children: React.ReactNode;
  href: string;
  target: string;
  onClick?: (event: any) => void;
  onAuxClick?: (event: any) => void;
};

function Link({ children, ...props }: LinkProps) {
  return (
    <Anchor {...props}>
      {children}
    </Anchor>
  );
}

export default Link;
