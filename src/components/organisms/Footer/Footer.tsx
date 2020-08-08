import React from 'react';

import { ConnectionInfo } from 'components/molecules';

import { Base } from './Footer.style';

function Footer({ disabled }: { disabled: boolean }) {
  return (
    <Base>
      <ConnectionInfo disabled={disabled} />
    </Base>
  );
}

export default Footer;
