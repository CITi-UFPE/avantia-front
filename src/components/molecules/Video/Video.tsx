import React, { useEffect, useRef } from 'react';
import { notification } from 'antd';

import { useInfo } from 'contexts/GlobalProvider';

import { ReactComponent as ChromeSVG } from 'assets/BowserIcons/icons8-chrome.svg';
import { ReactComponent as EdgeSVG } from 'assets/BowserIcons/icons8-microsoft-edge.svg';
import { ReactComponent as FirefoxSVG } from 'assets/BowserIcons/firefox-logo.svg';
import { ReactComponent as BraveSVG } from 'assets/BowserIcons/icons8-brave-web-browser.svg';

import { VideoDisplay, BrowserContainer } from './Video.style';

function Video({ getDimensions }: { getDimensions: Function }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setInfo] = useInfo();

  const browserIncompatibilityMessage = (
    <p>
      Recomendamos o uso dos seguintes navegadores:
      <BrowserContainer>
        <ChromeSVG />
        <EdgeSVG />
        <FirefoxSVG height="45px" />
        <BraveSVG />
      </BrowserContainer>
    </p>
  );

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        // @ts-ignore
        const stream = navigator.mediaStream || await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            facingMode: 'user',
            width: 640,
            height: 480,
          },
        });

        if (videoRef.current) {
          const video = videoRef.current;
          video.srcObject = stream;
          video.play();
          video.onloadedmetadata = () => {
            getDimensions([video.videoHeight, video.videoWidth], video);
          };
        }
        if ([
          'iPad Simulator',
          'iPhone Simulator',
          'iPod Simulator',
          'iPad',
          'iPhone',
          'iPod',
        ].includes(navigator.platform)) {
          notification.warn({
            message: 'Experienciando problemas?',
            description: browserIncompatibilityMessage,
            duration: 10000,
          });
        }

        setInfo((prevInfo: Object) => ({
          ...prevInfo,
          stream,
        }));
      } catch (err) {
        notification.error({
          message: 'Sem acesso à câmera',
          description: 'Verifique na barra do navegador se há uma solicitação ou um ícone de câmera',
        });
      }
    };

    getUserMedia();
  }, [getDimensions, setInfo]);

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
    <VideoDisplay
      ref={(ref) => {
        // @ts-ignore
        const [video] = [...(ref?.children || [])];
        // @ts-ignore
        videoRef.current = video;
      }}
      dangerouslySetInnerHTML={{
        __html: `
          <video muted playsinline></video>
        `,
      }}
    />
  );
}

export default Video;
