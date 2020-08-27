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
        title="Sobre a Solução de Detecção de Máscaras"
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
          Utilizamos
          {' '}
          <span>
            Inteligência Artificial
          </span>
          {' '}
          para extrair informações de imagens e gerar melhoria de processos,
          aumento da segurança e redução de custos aos nosso clientes.
        </Paragraph>
        <Paragraph fontSize=".8rem">
          Grande parte das tecnologias que utilizamos é desenvolvida no
          {' '}
          <span>
            Avantia Labs
          </span>
          , unidade própria de pesquisa e desenvolvimento.
        </Paragraph>
        <Paragraph fontSize=".8rem">
          Nesta demonstração você pode verificar como receberá informações de seu
          estabelecimento, sobre a utilização indicada para as máscaras faciais.
        </Paragraph>
      </Modal>
    </>
  );
}

export default InfoModal;
