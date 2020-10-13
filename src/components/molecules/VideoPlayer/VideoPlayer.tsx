import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { Progress } from 'antd';

import { Paragraph } from 'components/atoms/Text';
import colors from 'styles/colors';
import padTime from 'helpers/padTime';

import playSvg from 'assets/icons/player.svg';

import {
  VideoBase,
  Image,
  ControlsContainer,
  PlayIcon,
  PlayButton,
} from './VideoPlayer.style';

function VideoPlayer({ src }: { src: Blob[] }) {
  const [currentTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const currentFrame = useRef(0);

  const imageArray = src.map((blob) => URL.createObjectURL(blob));

  console.log(src);

  const getPercentage = useCallback(() => {
    const totalFrames = src.length;

    return (currentFrame.current * 100) / totalFrames;
  }, [currentFrame, src.length]);

  const playFrame = useCallback(() => {
    const fps = 24;

    if (playing && currentFrame.current < imageArray.length - 1) {
      setTimeout(() => {
        playFrame();
      }, 1000 / fps);

      if (imageRef.current) imageRef.current.src = imageArray[currentFrame.current];
      currentFrame.current += 1;
    }
  }, [playing, imageArray]);

  const handlePlay = async () => {
    if (imageRef.current) setPlaying(true);
  };

  useEffect(() => {
    if (playing) playFrame();
  }, [playing, playFrame]);

  const currentMinutes = Math.floor((currentTime / 60));
  const currentSeconds = ((((currentTime * 1000) % (60 * 1000)) / 1000)).toFixed(0);

  return (
    <VideoBase>
      <Image ref={imageRef} src={imageArray[0]} />
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
