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

  const atLeastOneImage = urlList.filter((u) => u).length > 0;
  return (
    <Base
      role="button"
      clickable={atLeastOneImage}
      onClick={() => {
        if (atLeastOneImage) setModalVisible(true);
      }}
    >
      <LastNotificationsModal
        urlList={urlList}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
      <Title>Últimas Detecções</Title>
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
