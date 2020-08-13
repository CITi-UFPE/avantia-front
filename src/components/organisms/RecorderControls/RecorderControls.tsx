import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import RecordRTC from 'recordrtc';
import { PauseOutlined } from '@ant-design/icons';

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
  const [type, setType] = useState<'image' | 'video' | null>(null);
  const [recording, setRecording] = useState(false);
  const [info] = useInfo();

  const recorderRef = useRef<RecordRTC | null>(null);
  const intervalRef = useRef(0);

  const drawImageOnVideo = (canvas: HTMLCanvasElement) => {
    const drawCanvas = canvas;

    drawCanvas.width = info.video.videoWidth;
    drawCanvas.height = info.video.videoHeight;

    const ctx = drawCanvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.translate(drawCanvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(info.video, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(info.canvas, 0, 0);

    const image = drawCanvas.toDataURL('image/png');
    return image;
  };

  const handleRecord = () => {
    if (!info.canvas || !info.video) return;

    if (mode === 'camera') {
      setData(drawImageOnVideo(document.createElement('canvas')));
      setType('image');
    }
    if (mode === 'video' && info.stream) {
      if (recording && recorderRef.current && intervalRef.current) {
        recorderRef.current.stopRecording();
        // @ts-ignore
        recorderRef.current.getDataURL((result) => {
          setData(result);
          setType('video');
        });
        clearInterval(intervalRef.current);
        setRecording(false);
        return;
      }
      const canvas = document.createElement('canvas');
      const drawToCanvas = setInterval(() => {
        drawImageOnVideo(canvas);
      }, 1000 / 60);
      // @ts-ignore
      const canvasStream: MediaStream = canvas.captureStream(60);

      const canvasPlusAudioStream = new MediaStream();

      canvasStream.getTracks().forEach((t) => {
        if (t.kind === 'video') canvasPlusAudioStream.addTrack(t);
      });

      info.stream.getTracks().forEach((t: MediaStreamTrack) => {
        if (t.kind === 'audio') canvasPlusAudioStream.addTrack(t);
      });

      const recorder = new RecordRTC(canvasPlusAudioStream, {
        type: 'video',
      });

      recorder.startRecording();

      setRecording(true);

      recorderRef.current = recorder;
      intervalRef.current = drawToCanvas;
    }
  };

  if (data && type) return <Redirect to={{ pathname: '/display', state: { data, type } }} />;

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
        <Button mode={mode} onClick={handleRecord}>
          {recording && <PauseOutlined />}
        </Button>
      </ButtonContainer>
    </ControlsContainer>
  );
}

export default RecorderControls;
