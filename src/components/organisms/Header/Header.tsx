import React from 'react';
import { withRouter } from 'react-router-dom';

import { ConnectionInfo } from 'components/molecules';
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
  NavItem,
} from './Header.style';

function Header() {
  return (
    <Base>
      <NavItem>
        <ConnectionInfo disabled={false} />
      </NavItem>

      <NavItem>
        <LogoContainer>
          <Image width="10rem" respWidth="6rem" src={logoPng} />
          <BetaText>versão DEMO</BetaText>
        </LogoContainer>
      </NavItem>

      <NavItem>
        <Link href={whatsappLink}>
          <Text>Entre em contato</Text>
          <WhatsappIcon src={whatsappSvg} />
        </Link>
      </NavItem>
    </Base>
  );
}

export default withRouter(Header);
