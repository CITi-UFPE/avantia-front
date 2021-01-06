import React from 'react';

import { ConnectionInfo } from 'components/molecules';
import { RecorderControls } from 'components/organisms';

import { Base } from './Footer.style';

function Footer({ disabled }: { disabled: boolean }) {
  return (
    <Base>
      <div />
      <RecorderControls referrer="" />
      <ConnectionInfo disabled={disabled} />
    </Base>
  );
}

export default Footer;
