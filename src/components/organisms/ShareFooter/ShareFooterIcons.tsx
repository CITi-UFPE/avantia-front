import React from 'react';
import { LinkOutlined } from '@ant-design/icons';
import {
  WhatsappShareButton,
  TelegramShareButton,
  LinkedinShareButton,
} from 'react-share';
import { notification } from 'antd';

import { Paragraph } from 'components/atoms/Text';

import whatsappSvg from 'assets/icons/whatsapp-real.svg';
import linkedinSvg from 'assets/icons/linkedin-real.svg';
import telegramSvg from 'assets/icons/telegram-real.svg';

import {
  SocialMediaIcon,
  TooltipTextContainer,
  CopyButton,
} from './ShareFooter.style';

function ShareFooterIcons({ shareUrl, closeModal }: { shareUrl: string, closeModal: () => void }) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    notification.success({
      message: 'Link copiado!',
    });
    closeModal();
  };

  return (
    <TooltipTextContainer>
      <CopyButton onClick={handleCopy}>
        <LinkOutlined style={{ color: '#FF943B', width: '20px' }} />
        <Paragraph color="orange">Copiar Link</Paragraph>
      </CopyButton>
      <WhatsappShareButton
        style={{ outline: 'none' }}
        title="Acabei de utilizar o analítico de detecção de máscaras da Avantia! Clique no link abaixo para visualizar como ficou!"
        url={shareUrl}
        onShareWindowClose={closeModal}
        separator={`
`}
      >
        <SocialMediaIcon src={whatsappSvg} />
        <Paragraph color="#65E093">Whatsapp</Paragraph>
      </WhatsappShareButton>
      <TelegramShareButton
        style={{ outline: 'none' }}
        title="Acabei de utilizar o analítico de detecção de máscaras da Avantia! Clique no link abaixo para visualizar como ficou!"
        url={shareUrl}
        onShareWindowClose={closeModal}
      >
        <SocialMediaIcon src={telegramSvg} />
        <Paragraph color="#2DA6E1">Telegram</Paragraph>
      </TelegramShareButton>
      <LinkedinShareButton
        style={{ outline: 'none' }}
        title="Acabei de utilizar o analítico de detecção de máscaras da Avantia! Clique no link abaixo para visualizar como ficou!"
        url={shareUrl}
        onShareWindowClose={closeModal}
        summary="Um analítico para reconhecimento de faces"
      >
        <SocialMediaIcon src={linkedinSvg} />
        <Paragraph color="#0574B1">Linkedin</Paragraph>
      </LinkedinShareButton>
    </TooltipTextContainer>
  );
}

export default ShareFooterIcons;
