import React, { useState } from 'react';
import { Modal } from 'antd';

import infoSvg from 'assets/icons/info.svg';
import { Paragraph } from 'components/atoms/Text';
import { Link } from 'components/atoms';
import { whatsappLink } from 'variables/contact';

import { InfoButton, InfoIcon } from './InfoModal.style';
import { StringGradients } from 'antd/lib/progress/progress';

function InfoModal({ actionText }: { actionText: string }) {
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
        title={`Sobre a Solução de ${actionText}`}
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
          Armazenamos fotos e vídeos gravados na plataforma por
          {' '}
          <strong>
            5 dias
          </strong>
          {' '}
          para que você possa compartilhar o link de
          visualização com outras pessoas.
          {' '}
          <strong>
            Não acessamos diretamente seus arquivos.
          </strong>
        </Paragraph>
        <Paragraph fontSize=".8rem">
          Ao fim do período de 5 dias, os arquivos
          e link são automaticamente deletados.
        </Paragraph>
      </Modal>
    </>
  );
}

export default InfoModal;
