import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from 'antd';

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
  ButtonContainer,
  ConnectionContainer,
  ConnectionIcon,
  Highlight,
} from './ConnectionInfo.style';

function ConnectionInfo({ disabled }: { disabled: boolean }) {
  const [statusInfo, setStatusInfo] = useState({
    color: '',
    text: '',
    icon: disabledConnectionSvg,
  });
  const [visible, setVisible] = useState(false);
  const isMobile = useMobile();
  const [info] = useInfo();

  const getLatencyOptions = useCallback(() => {
    const { latency } = info;

    if (!latency) {
      return { icon: disabledConnectionSvg, text: '', color: '' };
    }

    if (latency > 3000) {
      return { icon: badConnectionSvg, text: 'Ruim', color: '#d50808' };
    }
    if (latency > 600) {
      return { icon: averageConnectionSvg, text: 'Média', color: '#e6d12b' };
    }
    if (latency > 100) {
      return { icon: goodConnectionSvg, text: 'Boa', color: '#009a1d' };
    }

    return { icon: excellentConnectionSvg, text: 'Excelente', color: '#009a1d' };
  }, [info]);

  useEffect(() => {
    setStatusInfo(getLatencyOptions());
  }, [getLatencyOptions]);

  return (
    <InfoContainer disabled={disabled}>
      <Modal
        visible={visible}
        title="Qualidade de conexão"
        footer={null}
        centered
        onCancel={(e) => {
          e.stopPropagation();
          setVisible(false);
        }}
      >
        <Paragraph>
          Além de utilizarmos capacidade de detecção reduzida nesta demonstração
          {' '}
          <strong>
            sua conexão também influencia
          </strong>
          {' '}
          na fluidez da tecnologia.
        </Paragraph>
        <Paragraph>
          Sua conexão deve estar
          {' '}
          <span>
            ao menos
          </span>
          {' '}
          indicada como
          {' '}
          <Highlight>
            estável
          </Highlight>
          {' '}
          para poder realizar a demonstração.
        </Paragraph>
      </Modal>
      {!isMobile && (
        <ButtonContainer onClick={() => setVisible(true)}>
          <Paragraph noMargin color="orange">Conexão:</Paragraph>
          <InfoIcon src={disabled ? infoDisabledSvg : infoSvg} />
        </ButtonContainer>
      )}
      <ConnectionContainer>
        <ConnectionIcon src={disabled ? disabledConnectionSvg : statusInfo.icon} />
        {!isMobile && <Paragraph noMargin color={statusInfo.color}>{statusInfo.text}</Paragraph>}
      </ConnectionContainer>
    </InfoContainer>
  );
}

export default ConnectionInfo;
