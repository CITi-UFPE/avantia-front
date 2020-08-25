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
    se vídeo (
    <AccessIcon src={videoSvg} />
    {' + '}
    <AccessIcon src={videoRecordSvg} />
    ) ou tire sua foto (
    <AccessIcon src={cameraSvg} />
    {' + '}
    <AccessIcon src={photoShootSvg} />
    ) utilizando o filtro da solução de
    detecção de máscaras.
  </>,
  <>
    A demonstração opera com
    {' '}
    <strong>
      20% da capacidade
    </strong>
    {' '}
    total de análise, podedo ser reduzida pela qualidade de sua conexão
    com a internet.
    {' '}
    <strong>
      Verifique
    </strong>
    {' '}
    sua qualidade de conexão (
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
