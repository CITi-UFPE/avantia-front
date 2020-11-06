import React, { useState } from 'react';

import {
  Base,
  Title,
  ImageContainer,
  Placeholder,
  Image,
} from './LastNotifications.style';
import LastNotificationsModal from './LastNotificationsModal';

function LastNotifications({ urlList = [] }: { urlList: (string | null)[] }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Base role="button" onClick={() => setModalVisible(true)}>
      <LastNotificationsModal
        urlList={urlList}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
      <Title>Últimas Notificações</Title>
      <ImageContainer>
        {urlList.map((url) => {
          if (!url) return <Placeholder />;

          return <Image src={url} alt="Notificação" />;
        })}
      </ImageContainer>
    </Base>
  );
}

export default LastNotifications;
