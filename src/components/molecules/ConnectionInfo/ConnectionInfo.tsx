import React from 'react';
import { Tooltip } from 'antd';

import infoSvg from 'assets/icons/info.svg';
import goodConnectionSvg from 'assets/icons/good_connection.svg';
import { Paragraph } from 'components/atoms/Text';

import {
  InfoIcon,
  InfoContainer,
  TooltipContainer,
  ConnectionContainer,
  ConnectionIcon,
} from './ConnectionInfo.style';

const text = (
  <span>
    <Paragraph>
      O funcionamento do analítico pode ser comprometido pela
      {' '}
      <strong>qualidade da sua conexão</strong>
      {' '}
      com a internet.
    </Paragraph>
    <Paragraph>
      Para ter uma boa experiência, verifique se a conexão está BOA
    </Paragraph>
  </span>
);

function ConnectionInfo() {
  return (
    <InfoContainer>
      <TooltipContainer>
        <Paragraph noMargin color="orange">Conexão:</Paragraph>
        <Tooltip placement="topRight" color="white" title={text}>
          <InfoIcon src={infoSvg} />
        </Tooltip>
      </TooltipContainer>
      <ConnectionContainer>
        <ConnectionIcon src={goodConnectionSvg} />
      </ConnectionContainer>
    </InfoContainer>
  );
}

export default ConnectionInfo;
