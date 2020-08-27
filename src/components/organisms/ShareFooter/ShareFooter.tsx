import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal } from 'antd';

import { useMobile } from 'hooks';
import { Button } from 'components/atoms';
import { useAxios } from 'global/func';

import backArrowSvg from 'assets/icons/back-arrow.svg';
import shareSvg from 'assets/icons/share.svg';

import {
  Base,
  ButtonIcon,
  ShareIcon,
} from './ShareFooter.style';
import ShareFooterIcons from './ShareFooterIcons';

function ShareFooter({ data, type }: { data: string, type: string }) {
  const [redirect, setRedirect] = useState('');
  const [visible, setVisible] = useState(false);
  const [fileId, setFileId] = useState('');
  const isMobile = useMobile();
  const [axiosPost] = useAxios('post');

  const { host } = window.location;

  const handleClick = async () => {
    if (!fileId) {
      const formData = new FormData();
      const isImage = type === 'image';

      const res = await fetch(data);
      const blob = await res.blob();
      const file = new File([blob], `send.${isImage ? 'png' : 'webm'}`, blob);

      formData.set('media', file);
      const fileRes = await axiosPost({
        url: '/uploads',
        body: formData,
      });
      setFileId(fileRes.data.data.fileId);
    }
    setVisible(true);
  };

  const shareUrl = `https://${host}/livedemo/s/${fileId}`;

  if (redirect) return <Redirect to={redirect} />;

  return (
    <Base>
      <Modal
        visible={visible}
        title="Compartilhe em:"
        footer={null}
        centered
        onCancel={(e) => {
          e.stopPropagation();
          setVisible(false);
        }}
      >
        <ShareFooterIcons closeModal={() => setVisible(false)} shareUrl={shareUrl} />
      </Modal>
      <Button onClick={() => setRedirect('/livedemo/analitico')}>
        <ButtonIcon src={backArrowSvg} />
        {!isMobile && 'Voltar para teste'}
      </Button>
      <Button onClick={handleClick} style={{ color: 'white' }} type="primary">
        {!isMobile && 'Compartilhar'}
        <ShareIcon src={shareSvg} />
      </Button>
    </Base>
  );
}

export default ShareFooter;
