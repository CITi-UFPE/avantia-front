import React, { useState } from 'react';
import { notification } from 'antd';
import { Redirect } from 'react-router-dom';

import { Button } from 'components/atoms';
import { Title } from 'components/atoms/Text';
import arrowSvg from 'assets/icons/arrow.svg';
import videoSvg from 'assets/icons/video.svg';
import whiteConnectionSvg from 'assets/icons/connection/white.svg';
import timerSvg from 'assets/icons/timer.svg';
import shareSvg from 'assets/icons/share.svg';
import lockSvg from 'assets/icons/lock.svg';

import {
  AccessBackground,
  TextContainer,
  AccessIcon,
  AccessItemContainer,
  AccessItem,
  Image,
  AccessText,
  BottomText,
} from './AccessCard.style';
import accessItems from './AccessItems';

function AccessCard() {
  const [redirect, setRedirect] = useState('');

  const requestAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          facingMode: 'user',
          width: 640,
          height: 480,
        },
      });

      // @ts-ignore
      navigator.mediaStream = stream;

      setRedirect('/livedemo/analitico');
    } catch (err) {
      notification.error({
        message: 'Sem acesso à câmera',
        description: 'Verifique na barra do navegador se há uma solicitação ou um ícone de câmera',
      });
    }
  };

  if (redirect) return <Redirect to={redirect} />;

  return (
    <AccessBackground>
      <TextContainer>
        <Title bold color="orange">Avantia Live Demo</Title>
        <AccessItemContainer>
          {accessItems.map((item, i) => (
            <AccessItem>
              <Image src={[videoSvg, whiteConnectionSvg, timerSvg, shareSvg][i]} />
              <AccessText>{item}</AccessText>
            </AccessItem>
          ))}
        </AccessItemContainer>
        <Button className="small" style={{ color: 'white' }} size="small" type="primary" onClick={requestAccess}>
          Ir para o teste
          <AccessIcon button src={arrowSvg} />
        </Button>
        <BottomText color="white">
          <Image src={lockSvg} />
          <p>
            Sua privacidade é garantida. Estamos alinhados às normativas
            da nova Lei Geral de Proteção de Dados (LGPD).
          </p>
        </BottomText>
      </TextContainer>
    </AccessBackground>
  );
}

export default AccessCard;
