import React, { useEffect, useRef } from 'react';

import { useInfo } from 'contexts/GlobalProvider';
import { VideoDisplay } from './Video.style';

function Video({ getDimensions }: { getDimensions: Function }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setInfo] = useInfo();

  useEffect(() => {
    const getUserMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: 'user' },
      });

      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          getDimensions([video.videoHeight, video.videoWidth], video);
        };
      }
    };

    getUserMedia();
  }, [getDimensions]);

  useEffect(() => {
    if (videoRef.current) {
      setInfo((prevInfo: Object) => ({
        ...prevInfo,
        video: videoRef.current,
      }));
    }
    return () => {
      setInfo((prevInfo: Object) => ({
        ...prevInfo,
        video: null,
      }));
    };
  }, [videoRef, setInfo]);

  return (
    <VideoDisplay ref={videoRef} autoPlay>
      <track kind="captions" />
    </VideoDisplay>
  );
}

export default Video;
