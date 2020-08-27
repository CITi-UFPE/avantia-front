import React, { useEffect, useRef } from 'react';
import { notification } from 'antd';

import { useInfo } from 'contexts/GlobalProvider';
import { VideoDisplay } from './Video.style';

function Video({ getDimensions }: { getDimensions: Function }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setInfo] = useInfo();

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
            description: 'Alguns usuários podem experienciar problemas nesse navegador, caso isso aconteça com você, pro favor tente em uma dessas plataformas: Mozila Firefox, Google Chrome, Microsoft Edge, Brave',
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
          <video
            autoplay
            muted
            playsinline
          >
            <track kind="captions" />
            <p>Seu navegador não suporta vídeo HTML5.</p>
          </video>
        `,
      }}
    />
  );
}

export default Video;
