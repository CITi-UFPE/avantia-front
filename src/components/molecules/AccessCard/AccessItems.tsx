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
    <strong>
      Para você visualizar
    </strong>
    {' '}
    seu vídeo ou foto, armazenamos este por X tempo em nosso servidor
    e é apagado automaticamente logo após esgotado o tempo.
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
