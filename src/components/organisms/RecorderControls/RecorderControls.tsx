import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { useInfo } from 'contexts/GlobalProvider';

import cameraSvg from 'assets/icons/camera.svg';
import videoSvg from 'assets/icons/video.svg';

import {
  ControlsContainer,
  SwitchIcon,
  Switch,
  ButtonContainer,
  Button,
} from './RecorderControls.style';

function RecorderControls() {
  const [mode, setMode] = useState<'camera' | 'video'>('camera');
  const [data, setData] = useState('');
  const [info] = useInfo();

  const handleRecord = () => {
    if (!info.canvas || !info.video) return;

    if (mode === 'camera') {
      const canvas = document.createElement('canvas');

      canvas.width = info.video.videoWidth;
      canvas.height = info.video.videoHeight;

      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(info.video, 0, 0);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(info.canvas, 0, 0);

        const image = canvas.toDataURL('image/png');

        setData(image);
      }
    }
  };

  if (data) return <Redirect to={{ pathname: '/display', state: { data, type: 'image' } }} />;

  const disabled = !info.canvas || !info.video;

  return (
    <ControlsContainer>
      <Switch
        checked={mode === 'camera'}
        onChange={(checked) => setMode(checked ? 'camera' : 'video')}
        checkedChildren={<SwitchIcon src={cameraSvg} />}
        unCheckedChildren={<SwitchIcon src={videoSvg} />}
        disabled={disabled}
        size="default"
      />
      <ButtonContainer disabled={disabled}>
        <Button mode={mode} onClick={handleRecord} />
      </ButtonContainer>
    </ControlsContainer>
  );
}

export default RecorderControls;
