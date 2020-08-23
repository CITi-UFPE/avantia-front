import React, { useRef, useState } from 'react';
import { Progress } from 'antd';

import { Paragraph } from 'components/atoms/Text';
import colors from 'styles/colors';
import padTime from 'helpers/padTime';

import playSvg from 'assets/icons/player.svg';

import {
  VideoBase,
  Video,
  ControlsContainer,
  PlayIcon,
  PlayButton,
} from './VideoPlayer.style';

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const getPercentage = () => {
    if (!videoRef.current) return 0;
    const video = videoRef.current;
    return (currentTime * 100) / video.duration;
  };

  const handlePlay = async () => {
    if (videoRef.current) {
      try {
        const video = videoRef.current;
        if (video.readyState > 3) {
          video.crossOrigin = 'anonymous';
          await video.play();
        } else {
          video.addEventListener('loadedmetadata', async () => {
            video.crossOrigin = 'anonymous';
            await video.play();
          });
        }

        video.addEventListener('timeupdate', () => {
          setCurrentTime(video.currentTime);
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const currentMinutes = Math.floor((currentTime / 60));
  const currentSeconds = ((((currentTime * 1000) % (60 * 1000)) / 1000)).toFixed(0);

  return (
    <VideoBase>
      <Video playsInline crossOrigin="use-credentials" ref={videoRef}>
        <source type="video/webm" src={src} />
        <p>Seu navegador não suporta vídeo HTML5.</p>
      </Video>
      <ControlsContainer>
        <PlayButton onClick={handlePlay}>
          <PlayIcon src={playSvg} />
        </PlayButton>
        <Progress trailColor="#FF943BB3" strokeColor={colors.orange} percent={getPercentage()} showInfo={false} />
        <Paragraph style={{ margin: '0 10px' }} color="orange">
          {padTime(currentMinutes)}
          :
          {padTime(currentSeconds)}
        </Paragraph>
      </ControlsContainer>
    </VideoBase>
  );
}

export default VideoPlayer;
