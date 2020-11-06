import React, { useState } from 'react';
import { Modal } from 'antd';

import {
  ModalBigImage,
  ModalImageContainer,
  ModalImage,
  ModalPlaceholder,
} from './LastNotifications.style';

function LastNotificationsModal({
  visible,
  setVisible,
  urlList,
}: {
  visible: boolean,
  setVisible: (visible: boolean) => void,
  urlList: (string | null)[],
}) {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <Modal
      visible={visible}
      title="Últimas Notificações"
      footer={null}
      centered
      onCancel={(e) => {
        e.stopPropagation();
        setVisible(false);
      }}
    >
      <ModalBigImage src={urlList[imageIndex] || ''} alt="Notificação em foco" />
      <ModalImageContainer>
        {urlList.map((url, i) => {
          if (!url) return <ModalPlaceholder />;

          return <ModalImage onClick={() => setImageIndex(i)} src={url} alt="Notificação" />;
        })}
      </ModalImageContainer>
    </Modal>
  );
}

export default LastNotificationsModal;
