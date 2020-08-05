import React from 'react';

import { SessionTime } from 'components/molecules';
import { Button, Image } from 'components/atoms';

import { Base } from './Header.style';

import logoPng from 'assets/logo.png';
import { ReactComponent as WhatsappSvg } from 'assets/icons/whatsapp.svg';

function Header() {
  return (
    <Base>
      <SessionTime />

      <Image width="10rem" src={logoPng} />

      <Button>
        Veja nossos preços
        <WhatsappSvg style={{ height: '80%' }} />
      </Button>
    </Base>
  );
}

export default Header;
