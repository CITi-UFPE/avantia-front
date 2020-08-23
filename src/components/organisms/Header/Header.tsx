import React from 'react';
import { withRouter } from 'react-router-dom';

import { SessionTime } from 'components/molecules';
import { Image, Link } from 'components/atoms';
import { whatsappLink } from 'variables/contact';

import logoPng from 'assets/logo.png';
import whatsappSvg from 'assets/icons/whatsapp.svg';

import {
  Base,
  WhatsappIcon,
  Text,
  LogoContainer,
  BetaText,
} from './Header.style';

function Header({ location }: { location: any }) {
  return (
    <Base>
      <SessionTime transparent={location.pathname.indexOf('share') === -1} />

      <LogoContainer>
        <Image width="10rem" respWidth="6rem" src={logoPng} />
        <BetaText>versão DEMO</BetaText>
      </LogoContainer>

      <Link href={whatsappLink}>
        <Text>Entre em contato</Text>
        <WhatsappIcon src={whatsappSvg} />
      </Link>
    </Base>
  );
}

export default withRouter(Header);
