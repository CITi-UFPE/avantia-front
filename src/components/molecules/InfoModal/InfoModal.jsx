import React, { useState } from 'react';
import { Modal } from 'antd';

import infoSvg from 'assets/icons/info.svg';
import { Paragraph } from 'components/atoms/Text';
import { Button } from 'components/atoms';

import { InfoButton, InfoIcon, WhatsappIcon } from './InfoModal.style';

function InfoModal() {
  const [visible, setVisible] = useState(false);

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <>
      <InfoButton onClick={() => setVisible(true)}>
        <InfoIcon src={infoSvg} />
      </InfoButton>
      <Modal
        title="Sobre o analítico"
        visible={visible}
        onOk={hideModal}
        onCancel={hideModal}
        footer={[
          <Button>
            Fale conosco
            <WhatsappIcon />
          </Button>,
        ]}
      >
        <Paragraph fontSize=".8rem">
          A ferramenta analítico da Avantia verifica através de
          {' '}
          <strong>Inteligência Artificial</strong>
          {' '}
          em suas câmeras, se os frequentadores do seu negócio estão utilizando máscara ou não,
          o que traz mais segurança e controle de você sobre sua empresa.
        </Paragraph>
        <Paragraph fontSize=".8rem">
          Por se consistir em uma
          {' '}
          <strong>análise por câmera</strong>
          {' '}
          , ou seja, uma análise estritamente visual, o Analítico ira identificar como máscara
          quaisquer superfícies sólidas que cubram o nariz e a boca dos usuários.
        </Paragraph>
        <Paragraph fontSize=".8rem">
          <strong>Veja abaixo no vídeo</strong>
          {' '}
          como o analítico funciona em sua versão original completa
        </Paragraph>
      </Modal>
    </>
  );
}

export default InfoModal;
