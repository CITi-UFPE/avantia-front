import React, { useState } from 'react';
import { notification } from 'antd';
import { Redirect } from 'react-router-dom';

import { Button } from 'components/atoms';
import { Title, Paragraph } from 'components/atoms/Text';
import arrowSvg from 'assets/icons/arrow.svg';

import {
  AccessBackground,
  TextContainer,
  AccessIcon,
} from './AccessCard.style';

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
      console.log(err);
    }
  };

  if (redirect) return <Redirect to={redirect} />;

  return (
    <AccessBackground>
      <TextContainer>
        <Title bold color="orange">Autorize o acesso à sua câmera para testar o Analítico</Title>
        <Paragraph color="white">
          O analítico precisa ter acesso à sua câmera para iniciar
          seu teste. Em caso de erro, verifique se a câmera de seu
          dispositivo está sendo utilizada em outro aplicativo ou
          navegador
        </Paragraph>
        <Button style={{ color: 'white' }} type="primary" onClick={requestAccess}>
          Autorizar Câmera
          <AccessIcon src={arrowSvg} />
        </Button>
      </TextContainer>
    </AccessBackground>
  );
}

export default AccessCard;
