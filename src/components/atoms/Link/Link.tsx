import React from 'react';

import { Anchor } from './Link.style';

type LinkProps = {
  children: React.ReactNode;
  href: string;
  onClick?: (event: any) => void;
  onAuxClick?: (event: any) => void;
  noBorder?: boolean;
};

function Link({ children, ...props }: LinkProps) {
  return (
    <Anchor target="_blank" {...props}>
      {children}
    </Anchor>
  );
}

export default Link;
