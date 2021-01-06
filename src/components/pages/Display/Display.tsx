import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';

import { SecondaryBackground } from 'components/atoms';
import { Paragraph } from 'components/atoms/Text';
import { ShareFooter } from 'components/organisms';
import { VideoPlayer } from 'components/molecules';

import {
  Container,
  Image,
} from './Display.style';

function Display({ location }: { location: any }) {
  const [visible, setVisible] = useState(false);
  const { data, type, referrer } = location.state || {};

  useEffect(() => {
    if (!localStorage.getItem('seen_warn')) {
      localStorage.setItem('seen_warn', 'true');
      setVisible(true);
    }
  }, []);

  return (
    <>
      <SecondaryBackground>
        <Container>
          {type === 'image' && <Image src={data} />}
          {type === 'video' && <VideoPlayer src={data} />}
        </Container>
      </SecondaryBackground>
      <Modal
        visible={visible}
        title="Aviso importante"
        footer={null}
        centered
        onCancel={(e) => {
          e.stopPropagation();
          setVisible(false);
        }}
      >
        <Paragraph>
          Armazenamos fotos e vídeos gravados na plataforma por exatos
          {' '}
          <span>
            5 dias
          </span>
          {' '}
          para que você possa
          {' '}
          <span>
            compartilhar o link
          </span>
          {' '}
          de visualização destes com outras pessoas.
          Seu vídeo não será possível de ser acessado por ninguém de
          nossa equipe durante esse período.
        </Paragraph>
        <Paragraph>
          Após terminado o tempo, o vídeo será apagado automaticamente de
          nosso servidor, sendo assim também
          {' '}
          <span>
            retirado do link de compartilhamento gerado.
          </span>
        </Paragraph>
      </Modal>
      <ShareFooter data={data} type={location.state.type} referrer={referrer} />
    </>
  );
}

export default withRouter(Display);
