import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { Redirect } from 'react-router-dom';
import RecordRTC from 'recordrtc';
import { PauseOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

import { useInfo } from 'contexts/GlobalProvider';

import cameraSvg from 'assets/icons/camera.svg';
import videoSvg from 'assets/icons/video.svg';
import colors from 'styles/colors';

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
  const [countdown, setCountdown] = useState<number>(0);
  const [recording, setRecording] = useState(false);
  const [info] = useInfo();

  const recorderRef = useRef<RecordRTC | null>(null);
  const intervalRef = useRef(0);

  const drawImageOnVideo = useCallback((canvas: HTMLCanvasElement) => {
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
  }, [info]);

  const handleRecord = useCallback((timeLimitExceeded: boolean = false) => {
    if (!info.canvas || !info.video) return;

    if (mode === 'camera') {
      setData(drawImageOnVideo(document.createElement('canvas')));
      setType('image');
    }
    if (mode === 'video' && info.stream) {
      if ((recording && intervalRef.current) || timeLimitExceeded) {
        if (recorderRef.current) {
          recorderRef.current.stopRecording(() => {
            // @ts-ignore
            recorderRef.current.getDataURL((result) => {
              setData(result);
              setType('video');
            });
          });
          clearInterval(intervalRef.current);
          setCountdown(0);
          setRecording(false);
          return;
        }
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
        mimeType: 'video/x-matroska;codecs=avc1',
      });

      recorder.startRecording();

      setRecording(true);

      recorderRef.current = recorder;
      intervalRef.current = drawToCanvas;

      if (!timeLimitExceeded) {
        setCountdown(10);
      }
    }
  }, [drawImageOnVideo, info, mode, recording]);

  useEffect(() => {
    if (countdown) {
      const countdownTimeout = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(countdownTimeout);
    }
    return () => {};
  }, [countdown]);

  useEffect(() => {
    if (recording && !countdown) {
      handleRecord(true);
    }
  }, [recording, countdown, handleRecord]);

  if (data && type) return <Redirect to={{ pathname: '/livedemo/display', state: { data, type } }} />;

  const disabled = !info.canvas || !info.video;

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <ControlsContainer>
      <Tooltip
        {...(isSafari ? {} : { visible: false })}
        color="black"
        title="O seu navegador não suporta gravação de vídeo RTC"
      >
        <Switch
          checked={mode === 'camera'}
          onChange={(checked) => setMode(checked ? 'camera' : 'video')}
          checkedChildren={<SwitchIcon src={cameraSvg} />}
          unCheckedChildren={<SwitchIcon src={videoSvg} />}
          disabled={disabled || isSafari}
          size="default"
        />
      </Tooltip>
      {/*
      // @ts-ignore */}
      <ButtonContainer
        type="circle"
        percent={countdown ? countdown * 10 : 100}
        width={40}
        disabled={disabled}
        isRecording={recording}
        strokeColor={disabled ? colors.gray : colors.orange}
        format={() => (
          <Button mode={mode} onClick={() => handleRecord(false)}>
            {recording && <PauseOutlined style={{ color: 'white' }} />}
          </Button>
        )}
      />
    </ControlsContainer>
  );
}

export default RecorderControls;
