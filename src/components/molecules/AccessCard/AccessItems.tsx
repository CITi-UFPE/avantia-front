import React from 'react';

import videoSvg from 'assets/icons/video.svg';
import cameraSvg from 'assets/icons/camera.svg';
import videoRecordSvg from 'assets/icons/video_record.svg';
import photoShootSvg from 'assets/icons/photo_shoot.svg';
import goodConnectionSvg from 'assets/icons/connection/good.svg';

import { AccessIcon } from './AccessCard.style';

const itemsContent = [
  <>
    <strong>
      Grave
    </strong>
    {' '}
    seu vídeo (
    <AccessIcon src={videoSvg} />
    {' + '}
    <AccessIcon src={videoRecordSvg} />
    ) ou tire sua foto (
    <AccessIcon src={cameraSvg} />
    {' + '}
    <AccessIcon src={photoShootSvg} />
    ) utilizando nossa detecção de máscaras em tempo real.
  </>,
  <>
    Você está utilizando uma versão de demonstração
    que opera em velocidade reduzida. Sua internet também
    influencia no desempenho do site.
    Verifique sua qualidade de conexão
    (
    <AccessIcon src={goodConnectionSvg} />
    ).
  </>,
  <>
    Armazenamos fotos e vídeos gravados na plataforma por
    {' '}
    <strong>
      5 dias
    </strong>
    {' '}
    para que você possa compartilhar um link de
    acesso com outras pessoas.
  </>,
  <>
    <strong>
      Compartilhe
    </strong>
    {' '}
    seu vídeo ou foto em suas redes sociais e/ou salve em seu dispositivo!
  </>,
];

export default itemsContent;
