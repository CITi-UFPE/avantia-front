import React from 'react';

import { SessionTime } from 'components/molecules';
import { Button, Image } from 'components/atoms';

import { ReactComponent as WhatsappSvg } from 'assets/icons/whatsapp.svg';
import logoPng from 'assets/logo.png';

import { Base } from './Header.style';

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
