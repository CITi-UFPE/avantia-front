import React, {
  useState,
  useEffect,
  useCallback,
  memo,
  useRef,
} from 'react';
import { Redirect } from 'react-router-dom';
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
  const [data, setData] = useState<string | Blob[]>('');
  const [type, setType] = useState<'image' | 'video' | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [recording, setRecording] = useState(false);

  const stop = useRef(false);

  const [info] = useInfo();

  const imageArray: ({ id: number, data: Blob } | never)[] = [];
  const onGoingTasks = useRef(0);
  const counter = useRef(0);

  const drawImageOnVideoSync = useCallback((canvas: HTMLCanvasElement) => {
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

  const drawImageOnVideo = async (
    canvas: HTMLCanvasElement,
    video: HTMLVideoElement,
  ): Promise<Blob> => {
    const drawCanvas = canvas;

    drawCanvas.width = video.videoWidth;
    drawCanvas.height = video.videoHeight;

    const ctx = drawCanvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.translate(drawCanvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(canvas, 0, 0);

    const image = await new Promise<Blob>((res) => {
      drawCanvas.toBlob((blob) => {
        res(blob as Blob);
      }, 'image/jpeg', 0.4);
    });

    return image;
  };

  const recordImage = useCallback(async () => {
    const framerate = 24;

    if (!stop.current && counter.current < 240) {
      counter.current += 1;
      onGoingTasks.current += 1;
      setTimeout(() => {
        recordImage();
      }, 1000 / framerate);
    } else if (onGoingTasks.current === 0) {
      const array = [...imageArray];
      array.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      });
      counter.current = 0;
      const sortedMappedArray = array.map((frame) => frame.data);
      setData(sortedMappedArray);
      setType('video');
      setRecording(false);
      setCountdown(0);
      stop.current = false;
      return;
    }

    const image = await drawImageOnVideo(document.createElement('canvas'), info.video);
    imageArray.push({
      id: counter.current,
      data: image,
    });
    onGoingTasks.current -= 1;
  }, [info, stop, imageArray]);

  const handleRecord = useCallback(() => {
    if (!info.canvas || !info.video) return;

    if (mode === 'camera') {
      setData(drawImageOnVideoSync(document.createElement('canvas')));
      setType('image');
    }
    if (mode === 'video' && info.stream) {
      if (!recording) {
        setRecording(true);
        setCountdown(10);
        recordImage();
      } else {
        setRecording(false);
        stop.current = true;
        setCountdown(0);
      }
    }
  }, [drawImageOnVideoSync, info, mode, recording, recordImage]);

  useEffect(() => {
    if (countdown) {
      const countdownTimeout = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(countdownTimeout);
    }
    return () => { };
  }, [countdown]);

  if (data && type) return <Redirect to={{ pathname: '/livedemo/display', state: { data, type } }} />;

  const disabled = !info.canvas || !info.video;

  return (
    <ControlsContainer>
      <Tooltip
        visible={false}
        color="black"
        title="O seu navegador não suporta gravação de vídeo RTC"
      >
        <Switch
          checked={mode === 'camera'}
          onChange={(checked) => setMode(checked ? 'camera' : 'video')}
          checkedChildren={<SwitchIcon src={cameraSvg} />}
          unCheckedChildren={<SwitchIcon src={videoSvg} />}
          disabled={disabled}
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
          <Button mode={mode} onClick={handleRecord}>
            {recording && <PauseOutlined style={{ color: 'white' }} />}
          </Button>
        )}
      />
    </ControlsContainer>
  );
}

export default memo(RecorderControls);
