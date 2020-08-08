import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { Video, Canvas } from 'components/molecules';
import { useInfo } from 'contexts/GlobalProvider';

import { Container } from './VideoContainer.style';

function VideoContainer() {
  const [dimensions, setDimensions] = useState<number[]>([]);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement>();
  const [filters, setFilters] = useState<ServerResponse[]>();

  const [, setInfo] = useInfo();

  const handleDimensions = useCallback((values: number[], video: HTMLVideoElement) => {
    setDimensions(values);
    setVideoElement(video);
  }, [setDimensions, setVideoElement]);

  useEffect(() => {
    const sendImage = async () => {
      if (!videoElement) return;
      const canvas = document.createElement('canvas');

      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.translate(videoElement.videoWidth, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoElement, 0, 0);

      canvas.toBlob(async (blob) => {
        try {
          const formData = new FormData();

          formData.set('image', blob as Blob);

          const before = Date.now();

          const res = await axios.post('https://avantia.herokuapp.com/image', formData);
          const info: ServerResponse[] = res.data.data;

          setFilters(info);
          setInfo((prevInfo: Object) => ({
            ...prevInfo,
            latency: Date.now() - before,
          }));
        } catch (err) {
          console.log(err);
        }
      }, 'image/png');
      setTimeout(sendImage, 1000);
    };
    sendImage();
  }, [videoElement, setInfo]);

  return (
    <Container>
      <Video getDimensions={handleDimensions} />
      {dimensions.length > 0 && filters && (
        <Canvas filters={filters} dimensions={dimensions} />
      )}
    </Container>
  );
}

export interface ServerResponse {
  'bb_o': string;
  prob: number;
  label: 'mask' | 'nomask';
}

export default VideoContainer;
