import React, { useState } from 'react';
import { Modal } from 'antd';

import infoSvg from 'assets/icons/info.svg';
import { Paragraph } from 'components/atoms/Text';
import { Link } from 'components/atoms';
import { whatsappLink } from 'variables/contact';

import { InfoButton, InfoIcon } from './InfoModal.style';

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
        title="Sobre nossa Análise inteligente"
        visible={visible}
        onOk={hideModal}
        onCancel={hideModal}
        footer={[
          <Link
            onClick={hideModal}
            onAuxClick={hideModal}
            key="contact"
            href={whatsappLink}
          >
            Saiba mais
          </Link>,
        ]}
      >
        <Paragraph fontSize=".8rem">
          Somos especialistas em detecção através de imagens,
          contribuindo com clientes como Gerdau, McDonalds,
          Raia Drogasil e Governo do Estado de Pernambuco.
        </Paragraph>
        <Paragraph fontSize=".8rem">
          Esta demonstração é nossa Detecção de não uso de
          máscaras que através de câmeras identifica o uso
          ou não uso de máscara facial.
        </Paragraph>
        <Paragraph fontSize=".8rem">
          Confira essa e outras soluções contra o COVID-19
          no botão abaixo.
        </Paragraph>
      </Modal>
    </>
  );
}

export default InfoModal;
