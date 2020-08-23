import React, { useState, useEffect, useCallback } from 'react';
import { Tooltip } from 'antd';

import { Paragraph } from 'components/atoms/Text';
import { useInfo } from 'contexts/GlobalProvider';

import infoSvg from 'assets/icons/info.svg';
import infoDisabledSvg from 'assets/icons/info-disabled.svg';
import disabledConnectionSvg from 'assets/icons/connection/disabled.svg';
import goodConnectionSvg from 'assets/icons/connection/good.svg';
import badConnectionSvg from 'assets/icons/connection/bad.svg';
import excellentConnectionSvg from 'assets/icons/connection/excellent.svg';
import averageConnectionSvg from 'assets/icons/connection/average.svg';
import { useMobile } from 'hooks';

import {
  InfoIcon,
  InfoContainer,
  TooltipContainer,
  ConnectionContainer,
  ConnectionIcon,
} from './ConnectionInfo.style';

function ConnectionInfo({ disabled }: { disabled: boolean }) {
  const [statusInfo, setStatusInfo] = useState({
    color: '',
    text: '',
    icon: disabledConnectionSvg,
  });
  const isMobile = useMobile();
  const [info] = useInfo();

  const tooltipText = (
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

  const getLatencyOptions = useCallback(() => {
    const { latency } = info;

    if (!latency) {
      return {
        icon: disabledConnectionSvg,
        text: '',
        color: '',
      };
    }

    if (latency > 3000) {
      return {
        icon: badConnectionSvg,
        text: 'Ruim',
        color: '#d50808',
      };
    }
    if (latency > 600) {
      return {
        icon: averageConnectionSvg,
        text: 'Média',
        color: '#e6d12b',
      };
    }
    if (latency > 100) {
      return {
        icon: goodConnectionSvg,
        text: 'Boa',
        color: '#009a1d',
      };
    }

    return {
      icon: excellentConnectionSvg,
      text: 'Excelente',
      color: '#009a1d',
    };
  }, [info]);

  useEffect(() => {
    setStatusInfo(getLatencyOptions());
  }, [getLatencyOptions]);

  return (
    <InfoContainer disabled={disabled}>
      {!isMobile && (
        <TooltipContainer>
          <Paragraph noMargin color="orange">Conexão:</Paragraph>
          <Tooltip placement="topRight" color="white" title={tooltipText}>
            <InfoIcon src={disabled ? infoDisabledSvg : infoSvg} />
          </Tooltip>
        </TooltipContainer>
      )}
      <ConnectionContainer>
        <ConnectionIcon src={disabled ? disabledConnectionSvg : statusInfo.icon} />
        {!isMobile && <Paragraph noMargin color={statusInfo.color}>{statusInfo.text}</Paragraph>}
      </ConnectionContainer>
    </InfoContainer>
  );
}

export default ConnectionInfo;
