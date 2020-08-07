import React, { useEffect, useRef } from 'react';

import { VideoDisplay } from './Video.style';

function Video({ getDimensions }: { getDimensions: Function }) {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <VideoDisplay ref={videoRef} autoPlay>
      <track kind="captions" />
    </VideoDisplay>
  );
}

export default Video;
