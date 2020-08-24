import React, { useState } from 'react';
import { notification } from 'antd';
import { Redirect } from 'react-router-dom';

import { Button } from 'components/atoms';
import { Title } from 'components/atoms/Text';
import arrowSvg from 'assets/icons/arrow.svg';

import {
  AccessBackground,
  TextContainer,
  AccessIcon,
  AccessItemContainer,
  AccessItem,
  AccessNumber,
  AccessText,
  BottomText,
} from './AccessCard.style';
import accessItems from './AccessItems';

function AccessCard() {
  const [redirect, setRedirect] = useState('');

  const requestAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: 'user' },
      });
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
        <Title bold color="orange">Como a demonstração funciona?</Title>
        <AccessItemContainer>
          {accessItems.map((item, i) => (
            <AccessItem>
              <AccessNumber>{i + 1}</AccessNumber>
              <AccessText>{item}</AccessText>
            </AccessItem>
          ))}
        </AccessItemContainer>
        <Button style={{ color: 'white' }} type="primary" onClick={requestAccess}>
          Iniciar seu teste
          <AccessIcon button src={arrowSvg} />
        </Button>
        <BottomText color="white">
          Sua privacidade é garantida. Estamos alinhados às normativas
          da nova Lei de Proteção de Dados (LGPD).
        </BottomText>
      </TextContainer>
    </AccessBackground>
  );
}

export default AccessCard;
