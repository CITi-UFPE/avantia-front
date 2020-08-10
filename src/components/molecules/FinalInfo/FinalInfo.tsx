import React from 'react';

import { Link, Image } from 'components/atoms';
import { Paragraph } from 'components/atoms/Text';

import facebookLogo from 'assets/icons/facebook-blue.svg';
import whatsappLogo from 'assets/icons/whatsapp-blue.svg';
import linkedinLogo from 'assets/icons/linkedin-blue.svg';
import instagramLogo from 'assets/icons/instagram-blue.svg';

import {
  InfoContainer,
  IconContainer,
} from './FinalInfo.style';

function FinalInfo() {
  return (
    <InfoContainer>
      <Paragraph style={{ textAlign: 'center' }} bold color="orange">
        Saiba mais sobre analíticos de detecção e seus benefícios para sua empresa!
      </Paragraph>
      <Link href="https://google.com">
        Assinar Newsletter
      </Link>
      <IconContainer>
        <Link noBorder href="https://whatsapp.com">
          <Image src={whatsappLogo} width="20px" respWidth="15px" />
        </Link>
        <Link noBorder href="https://linkedin.com">
          <Image src={linkedinLogo} width="20px" respWidth="15px" />
        </Link>
        <Link noBorder href="https://instagram.com">
          <Image src={instagramLogo} width="20px" respWidth="15px" />
        </Link>
        <Link noBorder href="https://facebook.com">
          <Image src={facebookLogo} width="20px" respWidth="15px" />
        </Link>
      </IconContainer>
    </InfoContainer>
  );
}

export default FinalInfo;
