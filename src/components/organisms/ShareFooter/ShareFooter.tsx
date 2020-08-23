import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Tooltip, Modal } from 'antd';
import {
  WhatsappShareButton,
  TelegramShareButton,
  LinkedinShareButton,
} from 'react-share';

import { useMobile } from 'hooks';
import { Button } from 'components/atoms';
import { Paragraph } from 'components/atoms/Text';
import { useAxios } from 'global/func';

import backArrowSvg from 'assets/icons/back-arrow.svg';
import shareSvg from 'assets/icons/share.svg';
import whatsappSvg from 'assets/icons/whatsapp-real.svg';
import linkedinSvg from 'assets/icons/linkedin-real.svg';
import telegramSvg from 'assets/icons/telegram-real.svg';

import {
  Base,
  ButtonIcon,
  ShareIcon,
  SocialMediaIcon,
  TooltipTextContainer,
} from './ShareFooter.style';

function ShareFooter({ data, type }: { data: string, type: string }) {
  const [redirect, setRedirect] = useState('');
  const [visible, setVisible] = useState(false);
  const [fileId, setFileId] = useState('');
  const isMobile = useMobile();
  const [axiosPost] = useAxios('post');

  const { host } = window.location;

  useEffect(() => {
    const uploadData = async () => {
      const formData = new FormData();
      const isImage = type === 'image';

      const res = await fetch(data);
      const blob = await res.blob();
      const file = new File([blob], `send.${isImage ? 'png' : 'webm'}`, blob);

      formData.set('media', file);
      const fileRes = await axiosPost({
        url: '/uploads',
        body: formData,
      });
      console.log(fileRes);
      setFileId(fileRes.data.data.fileId);
    };
    uploadData();
  }, [axiosPost, data, type]);

  const shareUrl = `${host}/livedemo/share/${fileId}`;

  const tooltipText = (
    <TooltipTextContainer>
      <WhatsappShareButton
        style={{ outline: 'none' }}
        title="Avantia Analítico"
        url={shareUrl}
        separator={`
`}
      >
        <SocialMediaIcon src={whatsappSvg} />
      </WhatsappShareButton>
      <TelegramShareButton
        style={{ outline: 'none' }}
        title="Avantia Analítico"
        url={shareUrl}
      >
        <SocialMediaIcon src={telegramSvg} />
      </TelegramShareButton>
      <LinkedinShareButton
        style={{ outline: 'none' }}
        title="Avantia Analítico"
        url={shareUrl}
        summary="Um analítico para reconhecimento de faces"
      >
        <SocialMediaIcon src={linkedinSvg} />
      </LinkedinShareButton>
    </TooltipTextContainer>
  );

  if (redirect) return <Redirect to={redirect} />;

  return (
    <Base>
      <Modal
        visible={visible}
        title="Compartilhar em:"
        footer={null}
        centered
        onCancel={(e) => {
          e.stopPropagation();
          setVisible(false);
        }}
      >
        {tooltipText}
      </Modal>
      <Button onClick={() => setRedirect('/livedemo/analitico')}>
        <ButtonIcon src={backArrowSvg} />
        {(!isMobile && isMobile !== null) && 'Voltar para teste'}
      </Button>
      <Button onClick={() => setVisible(true)} style={{ color: 'white' }} type="primary">
        {(!isMobile && isMobile !== null) && 'Compartilhar'}
        <ShareIcon src={shareSvg} />
      </Button>
    </Base>
  );
}

export default ShareFooter;
