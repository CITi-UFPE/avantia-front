import React from 'react';

import { SessionTime } from 'components/molecules';
import { Button, Image } from 'components/atoms';

import logoPng from 'assets/logo.png';

import { Base, WhatsappIcon } from './Header.style';

function Header() {
  return (
    <Base>
      <SessionTime />

      <Image width="10rem" src={logoPng} />

      <Button>
        Contrate Agora
        <WhatsappIcon />
      </Button>
    </Base>
  );
}

export default Header;
